// Retrieve the messages from the database
const getMessages = () => {
 const messagesRef = firebase.database().ref('/messages');
 messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
    //  console.log(data);
     findMessage(data);
 });
}

let notFound = true;
let counter = 0;
const findMessage = (messages) => {
 const passcodeAttempt = document.querySelector('#passcode').value;
 for (message in messages) {
     const messageData = messages[message];
     if (messageData.passcode == passcodeAttempt) {
         renderMessageAsHtml(messageData.message);
         notFound = false;
     }
 }if (notFound){
     counter++;
     renderMessageAsHtml("error: message not found");
    // alert("error: message not found");
 }if (counter>=5){
     renderMessageAsHtml("error: too many incorrect attempts");
 }
}

const goBack = () => {
    document.querySelector("#back").classList.add("hidden");
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'block';
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = "";
}


const renderMessageAsHtml = (message) => {
document.querySelector("#back").classList.remove("hidden");
 // Hide the passcode view
 const passcodeInput = document.querySelector('#passcodeInput');
 passcodeInput.style.display = 'none';
 
 // Show the message
 const messageDiv = document.querySelector('#message');
 messageDiv.innerHTML = message; 
}