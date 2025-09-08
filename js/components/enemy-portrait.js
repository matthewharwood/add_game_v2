/**
 * Enemy Portrait Component - Displays an enemy's image
 */
export class EnemyPortrait extends HTMLElement {
  static get observedAttributes() {
    return ['imgsrc', 'alt'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const imgsrc = this.getAttribute('imgsrc') || '';
    const alt = this.getAttribute('alt') || 'Enemy';
    const inContainer = this.hasAttribute('no-border');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 200px;
        }
        
        :host-context(enemy-container) .portrait-container,
        :host-context(enemy-slot) .portrait-container {
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          height: 100%;
        }
        
        .portrait-container {
          border: 2px solid #000;
          border-radius: 8px;
          padding: 10px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        
        .enemy-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
      </style>
      <div class="portrait-container">
        ${imgsrc ? `<img class="enemy-image" src="${imgsrc}" alt="${alt}" />` : '<div class="enemy-image"></div>'}
      </div>
    `;
  }
}

customElements.define('enemy-portrait', EnemyPortrait);