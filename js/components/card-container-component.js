export class CardContainerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.dragState = null;
    this.hoveredSlot = null;
  }

  connectedCallback() {
    this.render();
    this.setupDragHandlers();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDragHandlers() {
    // Bind methods for document-level events
    this.boundMove = this.handleDragMove.bind(this);
    this.boundEnd = this.handleDragEnd.bind(this);
  }

  startDrag(card, event) {
    // Prevent multiple drags
    if (this.dragState) return;
    
    // Find the source slot
    const sourceSlot = this.findSlotForCard(card);
    
    // Clone the card to create a placeholder
    const placeholder = document.createElement('div');
    placeholder.style.width = '150px';
    placeholder.style.height = '210px';
    placeholder.style.visibility = 'hidden';
    
    // Get card's position before any style changes
    const cardRect = card.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Calculate grab point relative to the card's visible area
    const grabX = event.clientX - cardRect.left;
    const grabY = event.clientY - cardRect.top;
    
    // Initialize drag state
    this.dragState = {
      card: card,
      placeholder: placeholder,
      startX: event.clientX,
      startY: event.clientY,
      grabX: grabX,
      grabY: grabY,
      sourceSlot: sourceSlot,
      wasDragged: false
    };
    
    // Insert placeholder and remove card from document flow
    if (sourceSlot) {
      sourceSlot.insertBefore(placeholder, card);
    }
    document.body.appendChild(card);
    
    // Now set the card styles for dragging
    card.setAttribute('dragging', '');
    card.style.position = 'fixed';
    card.style.zIndex = '1000';
    card.style.width = '150px';
    card.style.height = '210px';
    // Position at exact grab point
    card.style.left = `${event.clientX - grabX}px`;
    card.style.top = `${event.clientY - grabY}px`;
    card.style.pointerEvents = 'none';
    card.style.margin = '0';
    
    // Highlight valid drop zones
    this.getAllSlots().forEach(slot => {
      slot.setAttribute('drop-ready', '');
    });
    
    // Add document listeners
    document.addEventListener('pointermove', this.boundMove);
    document.addEventListener('pointerup', this.boundEnd);
  }

  handleDragMove(e) {
    if (!this.dragState) return;
    
    const { card, startX, startY, grabX, grabY } = this.dragState;
    
    // Calculate movement
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    // Mark as dragged if moved more than 5px
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      this.dragState.wasDragged = true;
    }
    
    // Position card so the grab point stays under the cursor
    card.style.left = `${e.clientX - grabX}px`;
    card.style.top = `${e.clientY - grabY}px`;
    card.style.transform = 'scale(1.05) rotate(2deg)';
    
    // Find slot under cursor
    const targetSlot = this.findSlotAtPoint(e.clientX, e.clientY);
    
    // Update hover states
    if (targetSlot !== this.hoveredSlot) {
      if (this.hoveredSlot) {
        this.hoveredSlot.removeAttribute('hover');
        const occupant = this.hoveredSlot.getCard();
        if (occupant && occupant !== card) {
          occupant.style.transform = '';
        }
      }
      
      if (targetSlot) {
        targetSlot.setAttribute('hover', '');
        const occupant = targetSlot.getCard();
        if (occupant && occupant !== card) {
          // Preview swap animation
          occupant.style.transform = 'scale(0.95)';
          occupant.style.transition = 'transform 0.2s';
        }
      }
      
      this.hoveredSlot = targetSlot;
    }
  }

  handleDragEnd(e) {
    if (!this.dragState) return;
    
    const { card, sourceSlot, wasDragged, placeholder } = this.dragState;
    
    // If it was just a click (not dragged), restore the card to its original position
    if (!wasDragged) {
      // Remove placeholder and put card back
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.replaceChild(card, placeholder);
      } else if (sourceSlot) {
        sourceSlot.appendChild(card);
      }
      card.removeAttribute('dragging');
      card.style = '';
      this.cleanup();
      return;
    }
    
    // Find the target slot
    const targetSlot = this.hoveredSlot || sourceSlot;
    
    if (targetSlot && targetSlot !== sourceSlot) {
      // Check if we need to swap
      const targetCard = targetSlot.getCard();
      
      if (targetCard && targetCard !== card) {
        // Perform swap
        this.performSwap(card, targetCard, sourceSlot, targetSlot);
      } else {
        // Simple move
        this.performMove(card, sourceSlot, targetSlot);
      }
    } else {
      // Return to original position
      this.returnToSlot(card, sourceSlot);
    }
    
    // Cleanup
    this.cleanup();
  }

  performSwap(card1, card2, slot1, slot2) {
    // Remove placeholder if it exists
    if (this.dragState?.placeholder) {
      this.dragState.placeholder.remove();
    }
    
    // Remove both cards
    slot1.removeCard();
    slot2.removeCard();
    
    // Reset styles
    card1.style = '';
    card2.style = '';
    
    // Add cards to opposite slots
    slot2.acceptCard(card1);
    slot1.acceptCard(card2);
    
    // Animate the swap
    this.animateCardToSlot(card1, slot2);
    this.animateCardToSlot(card2, slot1);
    
    // Update slot states
    this.updateSlotStates();
  }

  performMove(card, sourceSlot, targetSlot) {
    // Remove placeholder if it exists
    if (this.dragState?.placeholder) {
      this.dragState.placeholder.remove();
    }
    
    // Remove from source
    if (sourceSlot) {
      sourceSlot.removeCard();
    }
    
    // Reset card style
    card.style = '';
    
    // Add to target
    targetSlot.acceptCard(card);
    
    // Animate to position
    this.animateCardToSlot(card, targetSlot);
    
    // Update slot states
    this.updateSlotStates();
  }

  returnToSlot(card, slot) {
    // Remove placeholder if it exists
    if (this.dragState?.placeholder) {
      this.dragState.placeholder.remove();
    }
    
    card.style = '';
    if (slot && !slot.hasCard()) {
      slot.acceptCard(card);
    }
    this.animateCardToSlot(card, slot);
    
    // Update slot states
    this.updateSlotStates();
  }
  
  updateSlotStates() {
    // Force all slots to update their occupied state
    this.getAllSlots().forEach(slot => {
      slot.updateOccupiedState();
    });
  }

  animateCardToSlot(card, slot) {
    // Simple animation effect
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = 'scale(1)';
    
    setTimeout(() => {
      card.style.transition = '';
      card.style.transform = '';
    }, 300);
  }

  findSlotForCard(card) {
    const slots = this.getAllSlots();
    return slots.find(slot => slot.contains(card));
  }

  findSlotAtPoint(x, y) {
    const slots = this.getAllSlots();
    
    // Temporarily hide the dragged card to get element underneath
    const draggedCard = this.dragState?.card;
    if (draggedCard) {
      draggedCard.style.pointerEvents = 'none';
    }
    
    const element = document.elementFromPoint(x, y);
    
    // Find if the element is a slot or inside a slot
    const slot = slots.find(s => s === element || s.contains(element));
    
    return slot;
  }

  getAllSlots() {
    return Array.from(this.querySelectorAll('card-slot-component'));
  }

  cleanup() {
    // Remove drag state
    if (this.dragState) {
      if (this.dragState.card) {
        this.dragState.card.removeAttribute('dragging');
        this.dragState.card.style.pointerEvents = '';
      }
      
      // Clean up placeholder if it still exists
      if (this.dragState.placeholder && this.dragState.placeholder.parentNode) {
        this.dragState.placeholder.remove();
      }
    }
    
    // Clear hover states
    this.getAllSlots().forEach(slot => {
      slot.removeAttribute('drop-ready');
      slot.removeAttribute('hover');
      const card = slot.getCard();
      if (card) {
        card.style.transform = '';
        card.style.transition = '';
      }
    });
    
    // Remove document listeners
    document.removeEventListener('pointermove', this.boundMove);
    document.removeEventListener('pointerup', this.boundEnd);
    
    // Reset state
    this.dragState = null;
    this.hoveredSlot = null;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
        }
        
        .container {
          border: 1px solid black;
          border-radius: 8px;
          padding: 12px;
        }
        
        .inner {
          background: #ccc;
          min-height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }
      </style>
      <div class="container">
        <div class="inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('card-container-component', CardContainerComponent);