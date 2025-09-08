import { DragDropController } from './drag-drop-controller.js';
import { AudioController } from './audio-controller.js';

/**
 * Simple Card Container - orchestrates drag and drop
 * Clean, focused, easy to understand
 */
export class CardContainerComponent extends HTMLElement {
  static get observedAttributes() {
    return ['click-sound'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.dragController = null;
    this.audioController = null;
  }

  connectedCallback() {
    this.render();
    this.setupDragDrop();
    this.setupAudio();
  }

  disconnectedCallback() {
    if (this.dragController) {
      this.dragController.destroy();
    }
    if (this.audioController) {
      this.audioController.stop();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'click-sound' && newValue && this.audioController) {
      this.audioController.load('click', newValue);
    }
  }

  setupAudio() {
    // Initialize audio controller
    this.audioController = new AudioController();
    
    // Load click sound if attribute is set
    const clickSound = this.getAttribute('click-sound');
    if (clickSound) {
      this.audioController.load('click', clickSound);
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
    
    // Play click sound if configured
    if (this.audioController && this.getAttribute('click-sound')) {
      this.audioController.play('click');
    }
    
    console.log('Card clicked:', card.value || card.textContent);
  }

  handleCardDrop(e) {
    const { element, dropZone, swapped } = e.detail;
    
    // Play sound on drop too
    if (this.audioController && this.getAttribute('click-sound')) {
      this.audioController.play('click');
    }
    
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