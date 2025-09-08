export class CardSlotComponent extends HTMLElement {
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
          display: inline-block;
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
        }
      </style>
      <div class="card-slot">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('card-slot-component', CardSlotComponent);