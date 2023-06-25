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

export const gameDetails = {
    title: 'Zorkington Demo',
    desc: 'Welcome to the world of... here are some quick rules & concepts...',
    author: 'Jimmie Compton II',
    cohort: 'PTSB-may-2023',
    startingRoomDescription: `What you see before you is...${rooms['outside'].description}`,
    playerCommands: [
        // replace these with your games commands as needed
        'inspect', 'view', 'look', 'pickup', 'move','drop'
    ]
};

// Your code here

export const domDisplay = (playerInput) => {
    /* 
        TODO: for students
        - This function must return a string. 
        - This will be the information that is displayed within the browsers game interface above the users input field.

        - This function name cannot be altered. 
        - "playerInput" is whatever text the user is typing within the input field in the browser after hitting the ENTER key.
            - test this out with a console log.

        What your player should be able to do (checklist):
            - move between rooms
            - view current room
            - pickup moveable items
                - there should be at least 2 items that cannot be moved.
            - view player inventory
        
        Stretch Goals:
            - drop items in "current room" (if a player picks up an item in one room and moves to another, they should be able to remove it from their inventory)
            - create win/lose conditions.
                - this could be a puzzle that may require an item to be within the players inventory to move forward, etc.

        HINTS:
            - consider the various methods that are available to use.
            - arrays are a great way to hold "lists".
            - You are not limited to just the exported function. Build additional functions and don't forget to hold the return within a variable.
            - Review notes!
                - Have them open as you build.
                - break down each problem into small chunks
                    - What is the process of picking up an item exactly? ex: Look. Pick from a list of items. Put into players list of items... 
    */

    // Your code here
    let displayString = '';

    if (!playerInput) {
        displayString = gameDetails.startingRoomDescription;
    } else {
        if (playerInput === 'move') {
            let availableRooms = movement[currentMovementState];
            if (availableRooms && availableRooms.length > 0) {
                displayString = `Available rooms to move: ${availableRooms.join(', ')}.`;
            } else {
                displayString = `There are no available rooms to move from ${currentMovementState}.`;
            }
        } else if (playerInput.startsWith('move ')) {
            let destinationRoom = playerInput.substring(5);
            let availableRooms = movement[currentMovementState];
            if (availableRooms && availableRooms.includes(destinationRoom)) {
                currentMovementState = destinationRoom;
                displayString = `You move to the ${destinationRoom}.`;
            } else {
                displayString = `The ${destinationRoom} room cannot be accessed from here.`;
            }
        } else if (playerInput === 'view') {
            let currentRoom = rooms[currentMovementState];
            displayString = `You are in the ${currentRoom.name}. ${currentRoom.description}.`;

            if (currentRoom.items.length > 0) {
                displayString += ` You notice the following items in the room: ${currentRoom.items.map(item => item.name).join(', ')}.`;
            } else {
                displayString += ' There are no items of interest in the room.';
            }
        } else if (playerInput === 'pickup') {
            let currentRoom = rooms[currentMovementState];
            let item = currentRoom.items[0];
            if (item) {
                if (item.location === currentMovementState) {
                    currentRoom.items.splice(0, 1);
                    currentRoom.inventory.push(item);
                    displayString = `You picked up the ${item.name}.`;
                } else if (playerInput.startsWith('drop ')) {
                    let itemName = playerInput.substring(5);
                    let currentRoom = rooms[currentMovementState];
                    let itemIndex = currentRoom.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
                    if (itemIndex !== -1) {
                        let droppedItem = currentRoom.inventory.splice(itemIndex, 1)[0];
                        currentRoom.items.push(droppedItem);
                        displayString = `You dropped the ${droppedItem.name} in the ${currentRoom.name}.`;
                    } else {
                        displayString = `You can't take the ${item.name} from this room.`;
                    }
                } else {
                    displayString = 'There are no items worth picking up in this room.';
                }
            } else {
                displayString = `I don't know how to ${playerInput}.`;
            }
        }

        return displayString;
    };
}
