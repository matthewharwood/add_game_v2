import '../js/components/enemy-info';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/EnemyInfo',
  component: 'enemy-info',
};

// Story for enemy-info component
export const FirstEnemy = {
  render: () => {
    const firstEnemy = enemies[0];
    return `
      <enemy-info
        name="${firstEnemy.name}"
        level="${firstEnemy.level}"
        health="${firstEnemy.health}"
        reward="${firstEnemy.reward}"
      ></enemy-info>
    `;
  },
};

export const MidLevelEnemy = {
  render: () => {
    const enemy = enemies[50];
    return `
      <enemy-info
        name="${enemy.name}"
        level="${enemy.level}"
        health="${enemy.health}"
        reward="${enemy.reward}"
      ></enemy-info>
    `;
  },
};

export const BossEnemy = {
  render: () => {
    const bossEnemy = enemies[enemies.length - 1];
    return `
      <enemy-info
        name="${bossEnemy.name}"
        level="${bossEnemy.level}"
        health="${bossEnemy.health}"
        reward="${bossEnemy.reward}"
      ></enemy-info>
    `;
  },
};

export const MultipleInfoCards = {
  render: () => {
    const enemySet = [enemies[0], enemies[25], enemies[50], enemies[75]];
    return `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        ${enemySet.map(enemy => `
          <enemy-info
            name="${enemy.name}"
            level="${enemy.level}"
            health="${enemy.health}"
            reward="${enemy.reward}"
          ></enemy-info>
        `).join('')}
      </div>
    `;
  },
};