/**
 * Simple Card Component - focused only on display
 * Clean, readable, single responsibility
 */
export class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setAttribute('draggable', 'true');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
      this.setAttribute('data-disabled', 'true');
    } else {
      this.removeAttribute('disabled');
      this.removeAttribute('data-disabled');
    }
  }

  render() {
    const isDisabled = this.disabled;
    const value = this.value;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          cursor: ${isDisabled ? 'not-allowed' : 'grab'};
        }
        
        :host([draggable="true"]:not([disabled])) {
          cursor: grab;
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
          user-select: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        :host(:not([disabled])) .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        :host([disabled]) .card {
          opacity: 0.5;
          border-color: rgba(0, 0, 0, 0.3);
        }
        
        :host(.dragging) .card {
          opacity: 0.8;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
      </style>
      <div class="card">
        <slot>${value}</slot>
      </div>
    `;
  }
}

customElements.define('card-component', CardComponent);