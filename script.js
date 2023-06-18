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
    startingRoomDescription: 'What you see before you is...',
    playerCommands: [
        // replace these with your games commands as needed
        'inspect', 'view', 'look', 'pickup', 'move'
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}

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
}

class Room {
    constructor(name, description, items, inventory = []) {//makes it so if there is nothing it can come up as nothing
        this.name = name;
        this.description = description;
        this.items = items
        this.inventory = inventory;
    }
}

const roomLookup = {//some room discriptions
    outside: "Its a pleasant day in the area and you are still late to your meeting.",
    mudroom: "A small mud room with tiled floors, coat hooks, and a bench for taking off shoes.",
    mainroom: "A cozy main room with a plush sofa, a wooden coffee table, and soft lighting.",
    office: "A tidy office room with a large wooden desk, a comfortable chair, and a window overlooking the street."
}

const rooms = {//room set up essentually 
    outside: new Room("Sidewalk", "Its a pleasent day in the area and you are still late to your meeting.", [], []
    ),
    mudroom: new Room(
        "mudroom", "A small mud room with tiled floors, coat hooks, and a bench for taking off shoes.", [], []
    ),
    mainroom: new Room(
        "mainroom", "A cozy main room with a plush sofa, a wooden coffee table, and soft lighting.", [], []
    ),
    office: new Room(
        "office", "A tidy office room with a large wooden desk, a comfortable chair, and a window overlooking the street.", [], []
    )
}

class Item {
    constructor(name, disc, location) {
        this.name = name;
        this.disc = disc;
        this.location = location;
    }
}

const items = {
    keycard: new Item("Key card", "A key card with a picture of you on it from your first day as well as your name on it", "outside"),
    notepad: new Item("Notepad", "A note pad that seems to have some doodles on it of assorted animals", "office"),
    book: new Item("Book", "A well read book that someone must have dropped", "mudroom")
}

let currentMovementState = 'outside';
//Make a state machine where you can go from the sidewalk to any area

const movement = {
    office: ['mainroom'],
    mainroom: ['mudroom', 'office'],
    mudroom: ['outside', 'mainroom'],
    outside: ['mudroom']
}

function start() {
    console.log(gameDetails.startingRoomDescription)
    while (true) {
        console.log(`you are currently at ${currentMovementState}`)
        console.log(`${roomLookup[currentMovementState]}`)
        let location = prompt(`Where do you want to go? `)
        let possibleStates = Object.keys(rooms)

        if (possibleStates.includes(location)) {
            currentMovementState = location;
            console.log(currentMovementState);
        } else {
            console.log('Invalid input')
        }
    }
}
start();
