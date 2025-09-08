import '../js/components/game-board';
import '../js/components/enemy-container';
import '../js/components/enemy-slot';
import '../js/components/enemy-portrait';
import '../js/components/enemy-info';
import '../js/components/card-container-component';
import '../js/components/card-slot-component';
import '../js/components/card-component';
import { enemies } from '../js/data/enemy_data';

export default {
  title: 'Components/GameBoard',
  component: 'game-board',
  parameters: {
    layout: 'fullscreen',
  },
};

// Empty game board
export const Empty = {
  render: () => `
    <game-board></game-board>
  `,
};

// Game board with enemy container in row 1
export const WithEnemyContainer = {
  render: () => {
    const enemy = enemies[0];
    return `
      <game-board>
        <enemy-container slot="row-1">
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
        </enemy-container>
      </game-board>
    `;
  },
};

// Game board with card container in row 3
export const WithCardContainer = {
  render: () => `
    <game-board>
      <card-container-component slot="row-3">
        <card-slot-component>
          <card-component>1</card-component>
        </card-slot-component>
        <card-slot-component>
          <card-component>2</card-component>
        </card-slot-component>
        <card-slot-component>
          <card-component>3</card-component>
        </card-slot-component>
        <card-slot-component>
          <card-component>4</card-component>
        </card-slot-component>
        <card-slot-component>
          <card-component>5</card-component>
        </card-slot-component>
      </card-container-component>
    </game-board>
  `,
};

// Full game setup
export const FullGameSetup = {
  render: () => {
    const enemySet = [enemies[5], enemies[10], enemies[15]];
    return `
      <game-board>
        <!-- Row 1: Enemies -->
        <enemy-container slot="row-1">
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
        
        <!-- Row 2: Empty card container (play area) -->
        <card-container-component slot="row-2">
          <card-slot-component></card-slot-component>
          <card-slot-component></card-slot-component>
          <card-slot-component></card-slot-component>
          <card-slot-component></card-slot-component>
          <card-slot-component></card-slot-component>
        </card-container-component>
        
        <!-- Row 3: Player's cards -->
        <card-container-component slot="row-3">
          <card-slot-component>
            <card-component>1</card-component>
          </card-slot-component>
          <card-slot-component>
            <card-component>2</card-component>
          </card-slot-component>
          <card-slot-component>
            <card-component>3</card-component>
          </card-slot-component>
          <card-slot-component>
            <card-component>4</card-component>
          </card-slot-component>
          <card-slot-component>
            <card-component>5</card-component>
          </card-slot-component>
        </card-container-component>
      </game-board>
    `;
  },
};

// Game board with mixed content
export const MixedContent = {
  render: () => {
    const enemy = enemies[25];
    return `
      <game-board>
        <!-- Row 1: Single enemy -->
        <enemy-container slot="row-1">
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
        </enemy-container>
        
        <!-- Row 2: Empty -->
        
        <!-- Row 3: Partial cards -->
        <card-container-component slot="row-3">
          <card-slot-component>
            <card-component>A</card-component>
          </card-slot-component>
          <card-slot-component></card-slot-component>
          <card-slot-component>
            <card-component>B</card-component>
          </card-slot-component>
          <card-slot-component></card-slot-component>
          <card-slot-component>
            <card-component>C</card-component>
          </card-slot-component>
        </card-container-component>
      </game-board>
    `;
  },
};