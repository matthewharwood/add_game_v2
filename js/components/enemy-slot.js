/**
 * Enemy Slot Component - Contains left slot for portrait and right slot for info
 * Manages the 2:1 aspect ratio layout for a single enemy
 */
export class EnemySlot extends HTMLElement {
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
          flex: 1;
          max-width: 420px;
        }
        
        .slot-container {
          display: flex;
          background: #fff;
          border: 2px solid #000;
          border-radius: 8px;
          overflow: hidden;
          height: 204px; /* Fixed height: 180px content + 20px padding + 4px borders */
          width: 100%;
        }
        
        .left-slot, .right-slot {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          height: 100%;
          box-sizing: border-box;
        }
        
        .left-slot {
          border-right: 1px solid #000;
        }
        
        /* Remove borders from slotted portrait and info components */
        ::slotted(enemy-portrait),
        ::slotted(enemy-info) {
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          width: 100%;
        }
        
        /* Handle empty slots */
        .left-slot:empty::after,
        .right-slot:empty::after {
          content: '';
          display: block;
          width: 100%;
          max-width: 180px;
          height: 180px;
          background: #f0f0f0;
          border: 1px dashed #ccc;
          border-radius: 4px;
        }
      </style>
      <div class="slot-container">
        <div class="left-slot">
          <slot name="portrait"></slot>
        </div>
        <div class="right-slot">
          <slot name="info"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('enemy-slot', EnemySlot);