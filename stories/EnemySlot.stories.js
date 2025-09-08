import '../js/components/enemy-slot';
import '../js/components/enemy-portrait';
import '../js/components/enemy-info';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/EnemySlot',
  component: 'enemy-slot',
};

// Empty enemy slot
export const EmptySlot = {
  render: () => `
    <enemy-slot></enemy-slot>
  `,
};

// Slot with only portrait
export const OnlyPortrait = {
  render: () => {
    const enemy = enemies[0];
    return `
      <enemy-slot>
        <enemy-portrait 
          slot="portrait"
          imgsrc="${enemy.imgsrc}"
          alt="${enemy.name}"
        ></enemy-portrait>
      </enemy-slot>
    `;
  },
};

// Slot with only info
export const OnlyInfo = {
  render: () => {
    const enemy = enemies[0];
    return `
      <enemy-slot>
        <enemy-info 
          slot="info"
          name="${enemy.name}"
          level="${enemy.level}"
          health="${enemy.health}"
          reward="${enemy.reward}"
        ></enemy-info>
      </enemy-slot>
    `;
  },
};

// Complete slot with both portrait and info
export const CompleteSlot = {
  render: () => {
    const enemy = enemies[0];
    return `
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
    `;
  },
};

// Multiple standalone slots
export const MultipleSlots = {
  render: () => {
    const enemySet = [enemies[5], enemies[15], enemies[25]];
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
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
      </div>
    `;
  },
};