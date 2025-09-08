/**
 * Enemy Info Component - Displays enemy information
 * Same size and shape as enemy-portrait
 */
export class EnemyInfo extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'level', 'health', 'reward'];
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
    const name = this.getAttribute('name') || '';
    const level = this.getAttribute('level') || '';
    const health = this.getAttribute('health') || '';
    const reward = this.getAttribute('reward') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        :host-context(enemy-container) .info-container,
        :host-context(enemy-slot) .info-container {
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 10px;
          height: 100%;
        }

        .info-container {
          border: 2px solid #000;
          border-radius: 8px;
          padding: 10px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }

        .enemy-name {
          font-size: 20px;
          font-weight: bold;
          color: #000;
          margin-bottom: 16px;
          text-align: center;
        }

        .enemy-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          padding: 6px 12px;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 14px;
        }

        .stat-label {
          color: #666;
          font-weight: 500;
        }

        .stat-value {
          color: #000;
          font-weight: bold;
        }

        .level-value {
          color: #008800;
        }

        .health-value {
          color: #cc0000;
        }

        .reward-value {
          color: #ff9900;
        }
      </style>
      <div class="info-container">
        ${name ? `<div class="enemy-name">${name}</div>` : ''}
        <div class="enemy-stats">
          ${level ? `
            <div class="stat">
              <span class="stat-label">Level</span>
              <span class="stat-value level-value">${level}</span>
            </div>
          ` : ''}
          ${health ? `
            <div class="stat">
              <span class="stat-label">Health</span>
              <span class="stat-value health-value">${this.formatNumber(health)}</span>
            </div>
          ` : ''}
          ${reward ? `
            <div class="stat">
              <span class="stat-label">Reward</span>
              <span class="stat-value reward-value">${this.formatNumber(reward)}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  formatNumber(num) {
    const number = parseFloat(num);
    if (isNaN(number)) return num;

    if (number >= 1e6) {
      return number.toExponential(2);
    }
    return number.toLocaleString();
  }
}

customElements.define('enemy-info', EnemyInfo);
