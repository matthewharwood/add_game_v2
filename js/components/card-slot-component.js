/**
 * Simple Card Slot Component - a clean drop zone
 * Focused, readable, reusable
 */
export class CardSlotComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setAttribute('data-drop-zone', 'true');
  }

  get isEmpty() {
    return !this.querySelector('card-component');
  }

  get card() {
    return this.querySelector('card-component');
  }

  accept(element) {
    // Clear any existing content
    this.clear();
    // Add the new element
    this.appendChild(element);
  }

  clear() {
    const existingCard = this.card;
    if (existingCard) {
      existingCard.remove();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        .slot {
          width: 174px;
          height: 234px;
          padding: 12px;
          border: 2px dashed #999;
          border-radius: 8px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.5);
        }
        
        :host(.drag-over) .slot {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
          transform: scale(1.02);
        }
        
        :host(:has(card-component)) .slot {
          border-style: solid;
          border-color: #666;
        }
        
        :host(.drag-over:has(card-component)) .slot {
          border-color: #FF9800;
          background: rgba(255, 152, 0, 0.1);
        }
      </style>
      <div class="slot">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('card-slot-component', CardSlotComponent);