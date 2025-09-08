export class CardContainerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .container {
          border: 1px solid black;
          border-radius: 8px;
          padding: 12px;
        }
        
        .inner {
          background: #ccc;
          min-height: 100px;
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