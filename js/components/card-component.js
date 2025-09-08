export class CardComponent extends HTMLElement {
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
        
        .card {
          width: 150px;
          height: 210px;
          background: white;
          border: 1px solid black;
          border-radius: 8px;
          box-sizing: border-box;
        }
      </style>
      <div class="card"></div>
    `;
  }
}

customElements.define('card-component', CardComponent);