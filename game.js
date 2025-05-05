class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = null;
    this._items = [];
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

  get items() {
    return this._items;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(itemName) {
    this._items = this._items.filter(item => item.name !== itemName);
  }

  hasItem(itemName) {
    return this._items.some(item => item.name === itemName);
  }

  describe() {
    let itemDescription = "";
    if (this._items.length > 0) {
      itemDescription = ". In this room, " + this._items.map(item => item.describe().toLowerCase()).join(" and ");
    }
    return "Looking around the " + this._name + ", you can see " + this._description + itemDescription;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = "The " + room.name + " is to the " + direction + ".";
      details.push(text);
    }
    return details;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way.");
      return this;
    }
  }
}

class Item {
  constructor(name) {
    this._name = name;
    this._description = "";
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
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
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  set name(value) {
    this._name = value;
  }

  set description(value) {
    this._description = value;
  }

  set conversation(value) {
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return "You have met " + this._name + ", who is " + this._description;
  }

  converse() {
    return this._name + " says '" + this._conversation + "'";
  }
}

const Wardrobe = new Room("wardrobe");
Wardrobe.description = "";

const Bedroom = new Room("bedroom");
Bedroom.description = "";
const teddyBear = new Item("teddybear");
teddyBear.description = "";
Bedroom.addItem(teddyBear);

const enSuite = new Room("ensuite");
enSuite.description = "";
const bedroomKey = new Item("bedroomkey");
bedroomKey.description = "";
enSuite.addItem(bedroomKey);

const Hallway = new Room("hallway");
Hallway.description = "";

const livingRoom = new Room("livingroom");
livingRoom.description = "";

const Kitchen = new Room("kitchen");
Kitchen.description = "";
const frontdoorKey = new Item("frontdoorkey");
frontdoorKey.description = "";
Kitchen.addItem(frontdoorKey);

const Foyer = new Room("foyer");
Foyer.description = "";

const Outside = new Room("outside");
Outside.description = "";



// Setup rooms and items

Wardrobe.linkRoom("south", Bedroom);
Bedroom.linkRoom("east", enSuite);
Bedroom.linkRoom("south", Hallway);
enSuite.linkRoom("west", Bedroom);
Hallway.linkRoom("north", Bedroom);
Hallway.linkRoom("east", livingRoom);
Hallway.linkRoom("south", Kitchen);
Hallway.linkRoom("west", Foyer);
Kitchen.linkRoom("south", Hallway);
Foyer.linkRoom("east", Hallway);
Foyer.linkRoom("west", Outside);

let currentRoom = Wardrobe;
let playerInventory = [];

function displayRoomInfo(room) {
  const textArea = document.getElementById("textarea");

  let occupantMsg = "";
  if (room.character) {
    occupantMsg = room.character.describe() + "<br>" + room.character.converse();
  }

  const description = room.describe();
  const details = room.getDetails().join("<br>");
  const inventory = playerInventory.length > 0 ? playerInventory.join(", ") : "empty";

  textArea.innerHTML = `
    <p>${description}</p>
    <p>${occupantMsg}</p>
    <p>${details}</p>
    <p>Your inventory: ${inventory}</p>
  `;
}

function collectItem(itemName) {
  if (currentRoom.hasItem(itemName)) {
    currentRoom.removeItem(itemName);
    playerInventory.push(itemName);
    return true;
  }
  return false;
}

function checkWinCondition() {
  const requiredItems = ["knife", "book", "cue", "key"];
  return requiredItems.every(item => playerInventory.includes(item));
}

function startGame() {
  currentRoom = Wardrobe;
  displayRoomInfo(currentRoom);

  const inputBox = document.getElementById("usertext");

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = inputBox.value.trim().toLowerCase();
      const directions = ["north", "south", "east", "west"];

      const output = document.getElementById("textarea");

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else if (command.startsWith("collect ")) {
        const itemName = command.replace("collect ", "");
        if (collectItem(itemName)) {
          output.innerHTML += `<p>You collected the ${itemName}!</p>`;
          if (checkWinCondition()) {
            output.innerHTML += `<p><strong>Congratulations! You've collected all the items. You win!</strong></p>`;
            inputBox.disabled = true;
          }
        } else {
          output.innerHTML += `<p>There's no ${itemName} here to collect.</p>`;
        }
      } else {
        output.innerHTML += `<p>Unknown command.</p>`;
      }

      inputBox.value = "";
    }
  });
}

// Start the game on page load
window.onload = startGame;