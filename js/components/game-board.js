/**
 * GameBoard Component - Full screen game board with 3 row grid layout
 */
export class GameBoard extends HTMLElement {
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
          width: 100%;
          height: 100dvh;
        }
        
        .game-board {
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          gap: 1rem;
          width: 100%;
          height: 100%;
          padding: 1rem;
          box-sizing: border-box;
          background: #f5f5f5;
        }
        
        .row {
          border: 1px solid #000;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: auto;
        }
        
        .row-1 {
          grid-row: 1;
        }
        
        .row-2 {
          grid-row: 2;
        }
        
        .row-3 {
          grid-row: 3;
        }
        
        /* Empty state styling */
        .row:empty::after {
          content: attr(data-row-label);
          color: #999;
          font-style: italic;
          font-size: 14px;
        }
        
        .row-1:empty::after {
          content: 'Row 1';
        }
        
        .row-2:empty::after {
          content: 'Row 2';
        }
        
        .row-3:empty::after {
          content: 'Row 3';
        }
      </style>
      <div class="game-board">
        <div class="row row-1">
          <slot name="row-1"></slot>
        </div>
        <div class="row row-2">
          <slot name="row-2"></slot>
        </div>
        <div class="row row-3">
          <slot name="row-3"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('game-board', GameBoard);