class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  set name(value) {
    this._name = value;
  }

  set description(value) {
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  describe() {
    return (
      "Looking around the " + this._name + " you can see " + this._description
    );
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way");
      alert(this._name);
      return this;
    }
  }
}

class Item {
    constructor(name) {
        this._name = name,
        this._description = ""
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
        // this._name = value; (looks wrong idk though)
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    describe() {
        return "The " + this._name + " is " + this._description;
    }
}

class Character {
    constructor(name) {
        this._name = name,
        this._description = "",
        this._dialogue = ""
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set dialogue(value) {
        this._dialogue = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get dialogue() {
        return this._dialogue;
    }

    describe() {
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }

    converse() {
        return this._name + " says " + "'" + this._dialogue + "'";
    }

}

class Enemy extends Character {
    constructor(name) {
        super(name);
        this._weakness = "";
    }

    set weakness(value) {
        this._weakness = value;
    }
    // fight
    interaction(item) {
        if (item = this_weakness) {
            return true;
        } else {
            return false;
        }
    }
}

//room objects
const Garden = new Room("garden");
Garden.description = "";
const Entrance = new Room("entrance");
Entrance.description = "";
const Hallway = new Room("hallway");
Hallway.description = "";
const Kitchen = new Room("kitchen");
Kitchen.description = "";
const LivingRoom = new Room("livingRoom");
LivingRoom.description = "";
const Landing = new Room("Landing");
Landing.description = "";
const Bedroom = new Room("bedroom");
Bedroom.description = "";
const Bathroom = new Room("bathroom");
Bathroom.description = "";
const Bedroom2 = new Room("bedroom2");
Bedroom2.description = "";
const Closet = new Room("closet");
Closet.description = "";

//link rooms together
Garden.linkRoom("north", Entrance);
Entrance.linkRoom("north", Hallway);
Hallway.linkRoom("west", LivingRoom);
Hallway.linkRoom("east", Kitchen);
Hallway.linkRoom("north", Landing);
LivingRoom.linkRoom("west", Hallway);
Kitchen.linkRoom("east", Hallway);
Landing.linkRoom("west", Bedroom);
Landing.linkRoom("east", Bathroom);
Landing.linkRoom("north", Bedroom2);
Bedroom.linkRoom("east", Landing);
Bathroom.linkRoom("west", Landing);
Bedroom2.linkRoom("south", Landing);
Bedroom2.linkRoom("east", Closet);
Closet.linkRoom("west", Bedroom2);

//add characters


//start game


