function startGame() {
    // Remove any existing event listener to avoid having multiple on game restart.
    document.removeEventListener("keydown", handleKeyPress);
  
    // Set and display start room
    currentRoom = EntranceLobby;
    console.log(currentRoom);
    displayRoomInfo(currentRoom);
  
    // Handle commands
    document.addEventListener("keydown", handleKeyPress);
  
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"];
  
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command);
          console.log("After Move:", currentRoom.name);
          document.getElementById("usertext").value = "";
          displayRoomInfo(currentRoom);
          if (currentRoom === SecretArchives && !inventory.includes("id badge")) {
            showLose();
          }
        } else if (command.toLowerCase().startsWith("pick up")) {
          const pickItem = command.substring(8).trim();
          console.log("this is getting called here");
          const val = inInventory(pickItem);
          console.log(val);
          document.getElementById("notificationUser").innerHTML = val;
          setTimeout(() => {
            document.getElementById("notificationUser").innerHTML = "";
          }, 5000);
          document.getElementById("usertext").value = "";
          displayRoomInfo(currentRoom);
        } else if (command.toLowerCase().startsWith("show")) {
          const showItem = command.substring(5).trim();
          document.getElementById("notificationUser").innerHTML =
            "Well Done, you have successfully infiltrated the enemy";
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
        } else {
          document.getElementById("usertext").value = "";
          alert("that is not a valid command please try again");
        }
      }
    }
  }
  
  startGame();