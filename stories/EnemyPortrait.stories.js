import '../js/components/enemy-portrait';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/EnemyPortrait',
  component: 'enemy-portrait',
};

// Story 1: Enemy portrait using first enemy from enemy_data.js
export const FirstEnemy = {
  render: () => {
    const firstEnemy = enemies[0];
    return `
      <enemy-portrait
        imgsrc="${firstEnemy.imgsrc}"
        alt="${firstEnemy.name}"
      ></enemy-portrait>
    `;
  },
};

export const HighLevelEnemy = {
  render: () => {
    const enemy = enemies[50]; // A higher level enemy
    return `
      <enemy-portrait
        imgsrc="${enemy.imgsrc}"
        alt="${enemy.name}"
      ></enemy-portrait>
    `;
  },
};

export const MultipleEnemies = {
  render: () => {
    const enemySet = [enemies[0], enemies[10], enemies[20], enemies[30]];
    return `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        ${enemySet.map(enemy => `
          <enemy-portrait
            imgsrc="${enemy.imgsrc}"
            alt="${enemy.name}"
          ></enemy-portrait>
        `).join('')}
      </div>
    `;
  },
};