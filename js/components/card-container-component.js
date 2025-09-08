import { DragDropController } from './drag-drop-controller.js';

/**
 * Simple Card Container - orchestrates drag and drop
 * Clean, focused, easy to understand
 */
export class CardContainerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.dragController = null;
  }

  connectedCallback() {
    this.render();
    this.setupDragDrop();
  }

  disconnectedCallback() {
    if (this.dragController) {
      this.dragController.destroy();
    }
  }

  setupDragDrop() {
    // Initialize drag-drop controller with simple options
    this.dragController = new DragDropController(this, {
      draggableSelector: 'card-component',
      dropZoneSelector: 'card-slot-component',
      dragClass: 'dragging',
      overClass: 'drag-over'
    });

    // Listen to drag events with clean handlers
    this.addEventListener('drag:click', this.handleCardClick.bind(this));
    this.addEventListener('drag:drop', this.handleCardDrop.bind(this));
  }

  handleCardClick(e) {
    const card = e.detail.element;
    console.log('Card clicked:', card.value || card.textContent);
  }

  handleCardDrop(e) {
    const { element, dropZone, swapped } = e.detail;
    
    // Log the action for debugging
    if (swapped) {
      console.log('Cards swapped');
    } else {
      console.log('Card moved to empty slot');
    }
    
    // Optional: Check win condition, update score, etc.
    this.checkGameState();
  }

  checkGameState() {
    // Simple example: check if cards are in order
    const slots = this.querySelectorAll('card-slot-component');
    const values = Array.from(slots).map(slot => {
      const card = slot.card;
      return card ? (card.value || card.textContent.trim()) : null;
    });
    
    console.log('Current state:', values);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .container {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 12px;
          background: #f5f5f5;
        }
        
        .slots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #e0e0e0;
          border-radius: 4px;
          min-height: 250px;
        }
      </style>
      <div class="container">
        <div class="slots">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('card-container-component', CardContainerComponent);