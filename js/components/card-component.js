export class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this.render();
    }
  }

  render() {
    const isDisabled = this.hasAttribute('disabled');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
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
        }
        
        .card.disabled {
          border-color: rgba(0, 0, 0, 0.5);
        }
        
        .card.disabled ::slotted(*) {
          opacity: 0.5;
        }
      </style>
      <div class="card ${isDisabled ? 'disabled' : ''}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('card-component', CardComponent);