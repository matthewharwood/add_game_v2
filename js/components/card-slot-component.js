export class CardSlotComponent extends HTMLElement {
  static get observedAttributes() {
    return ['drop-ready', 'hover', 'occupied'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.updateOccupiedState();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (['drop-ready', 'hover', 'occupied'].includes(name)) {
      this.render();
    }
  }

  updateOccupiedState() {
    const hasCard = this.querySelector('card-component');
    if (hasCard) {
      this.setAttribute('occupied', '');
    } else {
      this.removeAttribute('occupied');
    }
  }

  hasCard() {
    return this.querySelector('card-component') !== null;
  }

  getCard() {
    return this.querySelector('card-component');
  }

  acceptCard(card) {
    // Remove card from its current parent if it has one
    if (card.parentElement && card.parentElement !== this) {
      card.parentElement.removeChild(card);
    }
    this.appendChild(card);
    this.setAttribute('occupied', '');
  }

  removeCard() {
    const card = this.getCard();
    if (card) {
      this.removeChild(card);
      this.removeAttribute('occupied');
    }
    return card;
  }

  render() {
    const isDropReady = this.hasAttribute('drop-ready');
    const isHover = this.hasAttribute('hover');
    const isOccupied = this.hasAttribute('occupied');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }
        
        .card-slot {
          width: 150px;
          height: 210px;
          border: 2px dashed black;
          border-radius: 8px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .card-slot.drop-ready {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.05);
        }
        
        .card-slot.hover {
          border-color: #2196F3;
          border-width: 3px;
          background: rgba(33, 150, 243, 0.1);
          transform: scale(1.02);
        }
        
        .card-slot.occupied.hover {
          border-color: #FF9800;
          background: rgba(255, 152, 0, 0.1);
        }
      </style>
      <div class="card-slot ${isDropReady ? 'drop-ready' : ''} ${isHover ? 'hover' : ''} ${isOccupied ? 'occupied' : ''}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('card-slot-component', CardSlotComponent);