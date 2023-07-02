
##Concept
The concept of this project is to create a text-based 'Zorkington' style adventure game called "Goldilocks and the Three Bears". The player takes on the role of Goldilocks and must explore a cottage to find her way back home. The game involves moving between different rooms, interacting with items, solving puzzles, and unlocking doors.

##Pseudo Code:

// Object representing an item in the game
class Item {
  constructor(name, description, location) {
    // Item properties and methods
  }
}

// Object representing a room in the game
class Room {
  constructor(name, description, items, immovableItems = [], inventory = [], locked = false, key = null) {
    // Room properties and methods
  }
}

// Define various items in the game
const items = {
  // Define different items here
};

// Define various rooms in the game
const rooms = {
  // Define different rooms here
};

// Initialize game state and starting room
let currentMovementState = 'outside';
let inventory = [];

// Define movement between different rooms
const movement = {
  // Define movement between different rooms here
};

// Function to display game details and respond to player input
function domDisplay(playerInput) {
  // Process player input and update game state
  // Display messages based on player actions
  // Handle different player commands

  // Return display string for the player to see
}

// Object representing game details
const gameDetails = {
  title: 'Goldilocks and the Three Bears',
  desc: 'Welcome to the world of Goldilocks and the Three Bears...',
  author: 'Jimmie Compton II',
  cohort: 'PTSB-may-2023',
  startingRoomDescription: 'Goldilocks finds herself in a beautiful forest. There is a cozy house nearby.',
  playerCommands: ['inspect', 'look', 'view', 'pickup', 'move', 'drop', 'inventory', 'wake up', 'unlock'],
};

// Main game loop
// Initialize game state and display a warm welcome
// Repeat until game ends (e.g., player types 'wake up')
// - Display current room description and available items
// - Prompt player for input
// - Process player input using domDisplay function
// - Display the result of the player's action
