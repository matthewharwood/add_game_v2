import { openDB } from 'idb';

// Game state structure
export const Game = {
  draft: [],
  publish: [],
  coins: 0,         // Current game coins (renamed from score)
  level: 1,         // Current game level (now represents enemy level)
  timestamp: null,  // Last save timestamp
  enemy: null,      // Current enemy state {enemy, currentHealth}
  seed: 1,          // Random seed for deterministic randomness
  config: {         // Default loading rules configuration
    nCards: 5,      // Number of cards to generate
    defaultStart: 0,    // Starting number range
    defaultEnd: 100     // Ending number range
  }
};

// Database configuration
const DB_NAME = 'AddGameDB';
const DB_VERSION = 1;
const STORE_NAME = 'gameState';

// Initialize the database
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create the game state store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });

  return db;
};
