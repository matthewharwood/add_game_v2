export class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'dragging'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isDraggable = true;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' || name === 'dragging') {
      this.render();
    }
  }

  setupEventListeners() {
    this.cardElement = this.shadowRoot.querySelector('.card');
    
    this.handlePointerDown = this.onPointerDown.bind(this);
    this.handleClick = this.onClick.bind(this);
    
    this.cardElement.addEventListener('pointerdown', this.handlePointerDown);
    this.cardElement.addEventListener('click', this.handleClick);
  }

  removeEventListeners() {
    if (this.cardElement) {
      this.cardElement.removeEventListener('pointerdown', this.handlePointerDown);
      this.cardElement.removeEventListener('click', this.handleClick);
    }
  }

  onPointerDown(e) {
    if (this.hasAttribute('disabled')) return;
    
    const container = this.closest('card-container-component');
    if (container && container.startDrag) {
      e.preventDefault();
      container.startDrag(this, e);
    }
  }

  onClick(e) {
    if (this.hasAttribute('disabled')) return;
    
    // Prevent click animation if we were dragging
    if (this.hasAttribute('dragging')) return;
    
    this.animateClick();
  }

  animateClick() {
    this.cardElement.style.animation = 'none';
    void this.cardElement.offsetHeight; // Trigger reflow
    this.cardElement.style.animation = 'clickBounce 0.6s ease-out';
  }

  render() {
    const isDisabled = this.hasAttribute('disabled');
    const isDragging = this.hasAttribute('dragging');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }
        
        .card {
          width: 150px;
          height: 210px;
          background: white;
          border: 1px solid black;
          border-radius: 8px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          cursor: ${isDisabled ? 'default' : 'grab'};
          transition: transform 0.2s, box-shadow 0.2s;
          user-select: none;
          -webkit-user-select: none;
        }
        
        .card:hover:not(.disabled):not(.dragging) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .card.dragging {
          cursor: grabbing;
          z-index: 1000;
          opacity: 0.8;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        
        .card.disabled {
          border-color: rgba(0, 0, 0, 0.5);
          cursor: not-allowed;
        }
        
        .card.disabled ::slotted(*) {
          opacity: 0.5;
        }
        
        @keyframes clickBounce {
          0% { transform: scale(1) rotate(0deg); }
          20% { transform: scale(1.1) rotate(5deg); }
          40% { transform: scale(0.95) rotate(-5deg); }
          60% { transform: scale(1.05) rotate(3deg); }
          80% { transform: scale(0.98) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      </style>
      <div class="card ${isDisabled ? 'disabled' : ''} ${isDragging ? 'dragging' : ''}">
        <slot></slot>
      </div>
    `;
    
    if (this.cardElement) {
      this.setupEventListeners();
    }
  }
}

customElements.define('card-component', CardComponent);