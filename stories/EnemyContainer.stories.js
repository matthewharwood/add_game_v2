import '../js/components/enemy-container';
import '../js/components/enemy-slot';
import '../js/components/enemy-portrait';
import '../js/components/enemy-info';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/EnemyContainer',
  component: 'enemy-container',
};

// Empty enemy container
export const EmptyContainer = {
  render: () => `
    <enemy-container></enemy-container>
  `,
};

// Container with one enemy slot
export const OneEnemySlot = {
  render: () => {
    const firstEnemy = enemies[0];
    return `
      <enemy-container>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${firstEnemy.imgsrc}"
            alt="${firstEnemy.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${firstEnemy.name}"
            level="${firstEnemy.level}"
            health="${firstEnemy.health}"
            reward="${firstEnemy.reward}"
          ></enemy-info>
        </enemy-slot>
      </enemy-container>
    `;
  },
};

// Container with two enemy slots
export const TwoEnemySlots = {
  render: () => {
    const enemy1 = enemies[0];
    const enemy2 = enemies[10];
    return `
      <enemy-container>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy1.imgsrc}"
            alt="${enemy1.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy1.name}"
            level="${enemy1.level}"
            health="${enemy1.health}"
            reward="${enemy1.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy2.imgsrc}"
            alt="${enemy2.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy2.name}"
            level="${enemy2.level}"
            health="${enemy2.health}"
            reward="${enemy2.reward}"
          ></enemy-info>
        </enemy-slot>
      </enemy-container>
    `;
  },
};

// Container with three enemy slots (maximum)
export const ThreeEnemySlots = {
  render: () => {
    const enemy1 = enemies[0];
    const enemy2 = enemies[25];
    const enemy3 = enemies[50];
    return `
      <enemy-container>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy1.imgsrc}"
            alt="${enemy1.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy1.name}"
            level="${enemy1.level}"
            health="${enemy1.health}"
            reward="${enemy1.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy2.imgsrc}"
            alt="${enemy2.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy2.name}"
            level="${enemy2.level}"
            health="${enemy2.health}"
            reward="${enemy2.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy3.imgsrc}"
            alt="${enemy3.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy3.name}"
            level="${enemy3.level}"
            health="${enemy3.health}"
            reward="${enemy3.reward}"
          ></enemy-info>
        </enemy-slot>
      </enemy-container>
    `;
  },
};

// Container with empty slots
export const MixedEmptySlots = {
  render: () => {
    const enemy1 = enemies[5];
    return `
      <enemy-container>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${enemy1.imgsrc}"
            alt="${enemy1.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${enemy1.name}"
            level="${enemy1.level}"
            health="${enemy1.health}"
            reward="${enemy1.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <!-- Empty slot - shows placeholder -->
        </enemy-slot>
        <enemy-slot>
          <!-- Empty slot - shows placeholder -->
        </enemy-slot>
      </enemy-container>
    `;
  },
};

// Boss showcase with three high-level enemies
export const BossShowcase = {
  render: () => {
    const boss1 = enemies[enemies.length - 3];
    const boss2 = enemies[enemies.length - 2];
    const boss3 = enemies[enemies.length - 1];
    return `
      <enemy-container>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${boss1.imgsrc}"
            alt="${boss1.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${boss1.name}"
            level="${boss1.level}"
            health="${boss1.health}"
            reward="${boss1.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${boss2.imgsrc}"
            alt="${boss2.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${boss2.name}"
            level="${boss2.level}"
            health="${boss2.health}"
            reward="${boss2.reward}"
          ></enemy-info>
        </enemy-slot>
        <enemy-slot>
          <enemy-portrait 
            slot="portrait"
            imgsrc="${boss3.imgsrc}"
            alt="${boss3.name}"
          ></enemy-portrait>
          <enemy-info 
            slot="info"
            name="${boss3.name}"
            level="${boss3.level}"
            health="${boss3.health}"
            reward="${boss3.reward}"
          ></enemy-info>
        </enemy-slot>
      </enemy-container>
    `;
  },
};

// Test with more than 3 slots (should only show 3)
export const MoreThanThreeSlots = {
  render: () => {
    const enemySet = [enemies[0], enemies[10], enemies[20], enemies[30], enemies[40]];
    return `
      <enemy-container>
        ${enemySet.map(enemy => `
          <enemy-slot>
            <enemy-portrait 
              slot="portrait"
              imgsrc="${enemy.imgsrc}"
              alt="${enemy.name}"
            ></enemy-portrait>
            <enemy-info 
              slot="info"
              name="${enemy.name}"
              level="${enemy.level}"
              health="${enemy.health}"
              reward="${enemy.reward}"
            ></enemy-info>
          </enemy-slot>
        `).join('')}
      </enemy-container>
      <p style="margin-top: 10px; color: #666; font-style: italic;">
        Note: Only the first 3 enemy slots are displayed (Container limit)
      </p>
    `;
  },
};