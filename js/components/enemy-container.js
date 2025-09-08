/**
 * Enemy Container Component - Similar styling to CardContainer but for displaying enemies
 * Accepts a single slot for enemy content
 */
export class EnemyContainer extends HTMLElement {
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
          border: 1px solid #333;
          border-radius: 8px;
          padding: 12px;
          background: #f5f5f5;
        }
        
        .enemy-area {
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
        <div class="enemy-area">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('enemy-container', EnemyContainer);