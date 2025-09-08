import '../js/components/enemy-container';
import '../js/components/enemy-portrait';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/EnemyContainer',
  component: 'enemy-container',
};

// Story 2: Empty enemy container
export const EmptyContainer = {
  render: () => `
    <enemy-container></enemy-container>
  `,
};

// Story 3: Enemy container with enemy portrait inside
export const WithEnemyPortrait = {
  render: () => {
    const firstEnemy = enemies[0];
    return `
      <enemy-container>
        <enemy-portrait
          imgsrc="${firstEnemy.imgsrc}"
          alt="${firstEnemy.name}"
        ></enemy-portrait>
      </enemy-container>
    `;
  },
};

export const WithMultipleEnemies = {
  render: () => {
    const enemySet = [enemies[5], enemies[15], enemies[25]];
    return `
      <enemy-container>
        ${enemySet.map(enemy => `
          <enemy-portrait
            imgsrc="${enemy.imgsrc}"
            alt="${enemy.name}"
          ></enemy-portrait>
        `).join('')}
      </enemy-container>
    `;
  },
};

export const BossShowcase = {
  render: () => {
    const bossEnemy = enemies[enemies.length - 1]; // Last enemy (Shadow, level 999)
    return `
      <enemy-container>
        <enemy-portrait
          imgsrc="${bossEnemy.imgsrc}"
          alt="${bossEnemy.name}"
        ></enemy-portrait>
      </enemy-container>
    `;
  },
};