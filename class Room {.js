class Room {
    constructor(name, description, inventory = []) {//makes it so if there is nothing it can come up as nothing
        this.name = name
        this.description = description
        this.inventory = inventory
    }
}

const roomLookup = {//some room discriptions
    outside: "Its a pleasent day in the area and you are still late to your meeting.",
    mudroom: "A small mud room with tiled floors, coat hooks, and a bench for taking off shoes.",
    mainroom: "A cozy main room with a plush sofa, a wooden coffee table, and soft lighting.",
    office: "A tidy office room with a large wooden desk, a comfortable chair, and a window overlooking the street."
}

const rooms = {//room set up essentually 
    outside: new Room("Sidewalk", "Its a pleasent day in the area and you are still late to your meeting.", []
    ),
    mudroom: new Room(
        "mudroom", "A small mud room with tiled floors, coat hooks, and a bench for taking off shoes.", ["coat", "boots"]
    ),
    mainroom: new Room(
        "mainroom", "A cozy main room with a plush sofa, a wooden coffee table, and soft lighting.", []
    ),
    office: new Room(
        "office", "A tidy office room with a large wooden desk, a comfortable chair, and a window overlooking the street.", []
    )
}

let currentState = "outside";
//Make a state machine where you can go from the sidewalk to any area
const movement = {
    office: ['mainroom'],
    mainroom: ['mudroom', 'office'],
    mudroom: ['outside', 'mainroom'],
    outside: ['mudroom']
}

let currentMovementState = 'outside';

async function start() {
    console.log(startingRoomDescription)
    while (true) {
        console.log(`you are currently at ${currentMovementState}`)
        console.log(`${roomLookup[currentMovementState]}`)
        let location = await ask(`Where do you want to go? `)
        let possibleStates = movement[currentMovementState]
        //await ask question text
        //await ask where do you want to go next
        //conditional if !validState, print error
        if (possibleStates.includes(location)) {
            currentMovementState = location;
            console.log(currentMovementState);
        } else if (location === 'I want to go home') {
            process.exit();
        }
        else {
            console.log('Invalid input')
        }
    }
}
start();
