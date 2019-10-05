// function handleInput(event) {
//     const { value, name } = event.target;

//     this.setState({
//       [name]: value
//     });
//   }

//   function sendMessage(event) {
//     event.preventDefault();
//     const { newMessage, currentUser, currentRoom } = this.state;

//     if (newMessage.trim() === "") return;

//     currentUser.sendMessage({
//       text: newMessage,
//       roomId: `${currentRoom.id}`
//     });

//     this.setState({
//       newMessage: ""
//     });
//   }
