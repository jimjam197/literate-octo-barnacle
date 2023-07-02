/* 
    TODO for students
        General Setup:
            - This object is framed for you to fill out the values to help customize your game.
            - This will alter the browser to display your game title. The "Quick Notes" modal will also detail your information along with the description (desc) of what your game is about. It is important to highlight key commands that you want the player to use.
            - The startingRoomDescription will display what the player sees upon coming to your project.

        Do NOT alter the name of this object.

        Both exports are required in order for this project to run.

        - index.html should be running in your browser through the build process.
            - use your browsers console throughout testing.
*/

// Your code here
class Item {
  constructor(name, description, location) {
    this.name = name;
    this.description = description;
    this.location = location;
  }
}

class Room {
  constructor(name, description, items, immovableItems = [], inventory = [], locked = false, key = null) {
    this.name = name;
    this.description = description;
    this.items = items;
    this.immovableItems = immovableItems;
    this.inventory = inventory;
    this.locked = locked;
    this.key = key;
  }
}

const items = {
  porridge: new Item('porridge', 'A steaming bowl of porridge.', 'kitchen'),
  chair: new Item('chair', 'A small chair with a soft cushion.', 'dining room'),
  bed: new Item('bed', 'A cozy bed with a fluffy pillow and warm blanket.', 'bedroom'),
  spoon: new Item('spoon', 'A shiny spoon for eating.', 'dining room'),
  honey: new Item('honey', 'A jar of sweet honey.', 'kitchen'),
  key: new Item('key', 'A small golden key.', 'mudroom')
};

const rooms = {
  outside: new Room('outside', 'You are standing outside a quaint cottage in the woods.', [], []),
  mudroom: new Room('mudroom', 'A small mud room with tiled floors, coat hooks, and a bench for taking off shoes.', [items.key], []),
  kitchen: new Room('kitchen', "You are in the kitchen. There's a delicious aroma in the air.", [items.porridge], [items.honey], true, items.key),
  diningRoom: new Room('dining room', 'You are in the dining room. A table is set for a meal.', [items.spoon], [items.chair]),
  bedroom: new Room('bedroom', 'You are in the bedroom. A comfortable bed beckons you.', [items.bed], [])
};

let currentMovementState = 'outside';
let inventory = [];

const movement = {
  outside: ['mudroom'],
  mudroom: ['outside', 'kitchen'],
  kitchen: ['mudroom', 'dining room', 'bedroom'],
  diningRoom: ['kitchen'],
  bedroom: ['kitchen']
};

export const domDisplay = (playerInput) => {
  let displayString = '';

  if (!playerInput) {
    displayString = "Once upon a time, there was a little girl named Goldilocks.\n";
    displayString += "She wandered into the woods and found a charming cottage.\n";
    displayString += "Help Goldilocks explore the cottage and find her way back home.";
  } else if (playerInput === 'wake up') {
    displayString = "Goldilocks's eyes flutter open, realizing it was all a dream.";
    currentMovementState = 'outside';
    inventory = [];
    return displayString + '\n\nThe game has ended. Refresh the page to play again.';
  } else if (playerInput === 'look') {
    const currentRoom = rooms[currentMovementState];
    displayString = `Goldilocks looks around the ${currentRoom.name}.`;

    if (currentRoom.items.length > 0) {
      displayString += " Goldilocks sees the following items:\n";
      currentRoom.items.forEach((item) => {
        displayString += `- ${item.name}\n`;
      });
    } else {
      displayString += " The room is empty.";
    }
  } else if (playerInput === 'move') {
    const currentRoom = rooms[currentMovementState];
    const availableRooms = movement[currentMovementState];

    if (availableRooms && availableRooms.length > 0 && !currentRoom.locked) {
      displayString = `Goldilocks can move to the following rooms: ${availableRooms.join(', ')}.`;
    } else {
      displayString = `There are no available rooms to move from ${currentMovementState}.`;
    }
  } else if (playerInput.startsWith('move ')) {
    const destinationRoom = playerInput.substring(5);
    const currentRoom = rooms[currentMovementState];
    const availableRooms = movement[currentMovementState];

    if (availableRooms && availableRooms.includes(destinationRoom)) {
      if (destinationRoom === 'kitchen' && rooms.kitchen.locked) {
        displayString = `The kitchen is locked. Make sure Goldilocks has the key in her inventory.`;
      } else {
        currentMovementState = destinationRoom;
        displayString = `Goldilocks moves to the ${destinationRoom}.`;
      }
    } else {
      displayString = `Goldilocks cannot access the ${destinationRoom} room from here.`;
    }
  }  else if (playerInput === 'inventory') {
    if (inventory.length > 0) {
      displayString = `Goldilocks is carrying the following items:\n`;
      inventory.forEach((item) => {
        displayString += `- ${item.name}: ${item.description}`;
      });
    } else {
      displayString = "Goldilocks's inventory is empty.";
    }
  }else if (playerInput === 'pickup') {
    const currentRoom = rooms[currentMovementState];
    const itemIndex = currentRoom.items.findIndex((item) => item.location === currentMovementState);

    if (itemIndex !== -1) {
      const item = currentRoom.items[itemIndex];
      currentRoom.items.splice(itemIndex, 1);
      if (item.name === 'key') {
        currentRoom.locked = false;
      }
      inventory.push(item);
      displayString = `Goldilocks picked up the ${item.name}.`;
    } else {
      displayString = 'There are no items in this room for Goldilocks to pick up.';
    }
  } else if (playerInput.startsWith('drop ')) {
    const itemName = playerInput.substring(5);
    const currentRoom = rooms[currentMovementState];
    const itemIndex = inventory.findIndex((item) => item.name.toLowerCase() === itemName.toLowerCase());

    if (itemIndex !== -1) {
      const droppedItem = inventory[itemIndex];
      inventory.splice(itemIndex, 1);
      currentRoom.items.push(droppedItem);
      displayString = `Goldilocks dropped the ${droppedItem.name} in the ${currentRoom.name}.`;
    } else {
      displayString = `Goldilocks doesn't have the ${itemName} in her inventory.`;
    }
  } else if (playerInput.startsWith('unlock ')) {
    const doorToUnlock = playerInput.substring(7);
    const currentRoom = rooms[currentMovementState];

    if (doorToUnlock === 'kitchen' && currentRoom.name === 'mudroom') {
      const keyItem = currentRoom.items.find((item) => item.name === 'key');
      if (keyItem) {
        rooms.kitchen.locked = false;
        displayString = `Goldilocks used the key to unlock the kitchen door.`;
      } else {
        displayString = `Goldilocks doesn't have the key in her inventory.`;
      }
    } else {
      displayString = `Goldilocks cannot unlock the ${doorToUnlock} from this room.`;
    }
  } else {
    displayString = `I don't understand "${playerInput}".`;
  }

  return displayString;
};

export const gameDetails = {
  title: 'Goldilocks and the Three Bears',
  desc: 'Welcome to the world of Goldilocks and the Three Bears. Help Goldilocks explore the house and find her way back home.',
  author: 'Jimmie Compton II',
  cohort: 'PTSB-may-2023',
  startingRoomDescription: 'Goldilocks finds herself in a beautiful forest. There is a cozy house nearby.',
  playerCommands: ['look', 'pickup', 'move', 'drop', 'inventory', 'wake up', 'unlock'],
};
