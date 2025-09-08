/**
 * Enemy Container Component - Container for up to 3 EnemySlots
 * Manages the overall layout and spacing of enemy slots
 */
export class EnemyContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.validateSlotCount();
  }

  validateSlotCount() {
    const slots = this.querySelectorAll('enemy-slot');
    if (slots.length > 3) {
      console.warn('EnemyContainer: Maximum of 3 enemy-slots allowed. Extra slots will be hidden.');
      slots.forEach((slot, index) => {
        if (index >= 3) {
          slot.style.display = 'none';
        }
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .container {
          border: 2px solid #333;
          border-radius: 12px;
          padding: 16px;
          background: #f5f5f5;
          min-height: 250px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .slots-wrapper {
          display: flex;
          flex-direction: row;
          gap: 16px;
          justify-content: center;
          align-items: stretch;
        }
        
        /* Limit to 3 slots */
        ::slotted(enemy-slot:nth-of-type(n+4)) {
          display: none !important;
        }
        
        /* Remove any extra borders from slotted enemy-slots */
        ::slotted(enemy-slot) {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Empty state */
        .container:has(.slots-wrapper:empty) {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }
        
        .container:has(.slots-wrapper:empty)::after {
          content: 'Add up to 3 enemy slots';
          font-style: italic;
        }
      </style>
      <div class="container">
        <div class="slots-wrapper">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('enemy-container', EnemyContainer);