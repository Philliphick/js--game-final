class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._items = [];
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
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
        alert("description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    describe() {
      // return "Looking around the " + this._name + " you can see " + this._description;
      return `Looking around the ${this._name} you can see ${this._description} <br/> ` ;
    }
  
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is to the " + "<b>" + direction +"</b>"
        details.push(text);
      }
      return details;
    }
  
    //method to move to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        return this; // is this even necessary? 
      }
    }

    addItem(item) {
        this._items.push(item);
    }

    getItems() {
        return this._items;
    }
  }
  let inventory = [];

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
        alert("Decription is too short.");
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
      this._name = name,
      this._description = ""
      this._conversation = ""
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
        alert("Decription is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        alert("conversation is too short.");
        return;
      }
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
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }
  
  // create charcter objects
  
  
  
  //create the indiviual room objects and add their descriptions
  const EntranceLobby = new Room("Entrance Lobby");
  EntranceLobby.description = "a sleek and modern lobby with security cameras and guards.";
  const ControlRoom = new Room("Control Room");
  ControlRoom.description = "a room filled with monitors and security personnel.";
  const UndergroundTunnel = new Room("Underground Tunnel");
  UndergroundTunnel.description = "a long, dark tunnel beneath the facility.";
  const SecretArchives = new Room("Secret Archives");
  SecretArchives.description = "a room storing classified documents and blueprints.";
  const StorageCupboard = new Room("Storage Cupboard")
  StorageCupboard.description = "a well kept storage room full of filing cabinets, on the top of a nearby pile of papers theres a staff members <b>id badge</b> lying there that you could <b>pick up</b>.";
  
  const DoubleAgent = new Character("Mad Harry");
  EntranceLobby.character = (DoubleAgent);

  const Security = new Character("A Security Guard");
  SecretArchives.character = (Security);
  Security.conversation = "Only authorised personel should be here, who are you?";

  DoubleAgent.description = "a double agent, he's been waiting for your arrival";
  DoubleAgent.conversation = "Welcome, Agent. The path to the heart of the facility lies in the control room";
  
  const IDbadge = new Item("ID Badge")
  StorageCupboard.addItem(IDbadge);
  //link the rooms together
  EntranceLobby.linkRoom("north", ControlRoom);
  ControlRoom.linkRoom("east", UndergroundTunnel);
  ControlRoom.linkRoom("south", EntranceLobby);
  UndergroundTunnel.linkRoom("west", ControlRoom);
  UndergroundTunnel.linkRoom("north", SecretArchives);
  SecretArchives.linkRoom("south", UndergroundTunnel);
  EntranceLobby.linkRoom("west", StorageCupboard);
  StorageCupboard.linkRoom("east", EntranceLobby);

  
  
  function inInventory(newItem) {
    const userInput = document.getElementById("usertext").value;
    let pickupMessage = "";
    // const currentRoomItems = currentRoom.getItems();
    if(userInput.toLowerCase().includes(`pick up ${newItem.toLowerCase()}`)){
        inventory.push(newItem);
        console.log(`${newItem} has been added`);
        pickupMessage = `You picked up ${newItem}. It has been added to your inventory.`;
        console.log(pickupMessage)
      
    } 
       return pickupMessage
    }

   function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
      occupantMsg = ""
    // } else if(room === SecretArchives && inventory.includes("ID Badge")) {
    //     occupantMsg = "You're greeted by armed security personel" + ". " + room.character.converse() + "<br></br>" +
    //     "You can leave and go back <b>south</b> to the control room, or try your luck and <b>show</b> the <b>id badge</b> you found";
    
    } else if(room === SecretArchives && inventory.includes("id badge")) {
      occupantMsg = "You're greeted by armed security personel" + ". " + room.character.converse() + "<p> <br>" +
      "You can leave and go back <b>south</b> to the Underground Tunnel, or try your luck and <b>show</b> the <b>id badge</b> you found." + "</p> <br>";
    
    } else if(room === SecretArchives) {
      occupantMsg = "You're greeted by armed security personel" + ". " + room.character.converse() + "<br></br>"
    
  
    
    
    } else {
  
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    // const pickupMsg = inInventory("ID Badge");

    // console.log(pickupMsg);
  
    let textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails().join("<br/>") + "</p>";

  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();

    // if (pickupMsg !== "") {
    //     document.getElementById("textarea").innerHTML += "<p>" + pickupMsg + "</p>";
    // }
  }

  function showWin() {
    document.getElementById("textarea").innerHTML = "WELL DONE! YOU HAVE SUCCESSFULLY INFILTRATED THE ENEMY!" + "<br><button id='startButton' class='bg-white p-2 border-black rounded-md hover:bg-gray-700 hover:text-white'>Start Game</button>";
    document.getElementById("startButton").addEventListener("click", startGame);
  }

  function showLose() {
    document.getElementById("textarea").innerHTML = "YOU'VE BEEN CAUGHT! <br> There were armed security on the door and your current ID doesn't authorise you to enter this room" + "<br><button id='startButton' class='bg-white p-2 border-black rounded-md hover:bg-gray-700 hover:text-white'>Try Again</button>";
    document.getElementById("startButton").addEventListener("click", startGame);
  }
  
  // function startView() {
  //   document.getElementById("textarea").innerHTML = "SPY INFILTRATION" + "<br><button id='startButton' class='bg-white p-2 border-black rounded-md hover:bg-gray-700 hover:text-white'>Start Game</button>";
  //   document.getElementById("startButton").addEventListener("click", startGame);
  // }
  
  function startGame() {
    


    // remove any existing event listener - to stop having multiple on a games restart. 
    
    //set and display start room
    currentRoom = EntranceLobby;
    console.log (currentRoom);
    displayRoomInfo(currentRoom);
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"];

        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          console.log("After Move:", currentRoom.name)
          document.getElementById("usertext").value = ""
          displayRoomInfo(currentRoom);
          if(currentRoom === SecretArchives && !inventory.includes("id badge")){
            showLose();
          }
        } else if(command.toLowerCase().startsWith("pick up")){
            const pickItem = command.substring(8).trim();
            console.log("this is getting called here")
            const val = inInventory(pickItem);
            console.log(val)
            document.getElementById("notificationUser").innerHTML = val;
            setTimeout(() => {
                document.getElementById("notificationUser").innerHTML = "";
            }, 5000);
            document.getElementById("usertext").value = "";
            displayRoomInfo(currentRoom);
         } 
        else if(command.toLowerCase().startsWith("show")) {
          const showItem = command.substring(5).trim();
          document.getElementById("notificationUser").innerHTML = "Well Done, you have successfully infilrated the enemy";
            setTimeout(() => {
                document.getElementById("notificationUser").innerHTML = "";
            }, 10000);
            document.getElementById("usertext").value = "";
            showWin();
            // displayRoomInfo(currentRoom);

        } else if (command.toLowerCase() === "tunnel") {
          currentRoom = UndergroundTunnel;
          inventory.push("id badge");
          document.getElementById("usertext").value = "";
          displayRoomInfo(currentRoom);

        }
        else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
  
      }
    });
  }
  startGame();