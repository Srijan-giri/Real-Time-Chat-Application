const firebaseConfig = {
    apiKey: "AIzaSyBgVho9y1r32lgia_z_xNQrM-a3BnplHFo",
    authDomain: "chat-app-b18b7.firebaseapp.com",
    projectId: "chat-app-b18b7",
    storageBucket: "chat-app-b18b7.appspot.com",
    messagingSenderId: "154397546052",
    appId: "1:154397546052:web:7ac8f867d3fb80177e8e11"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = prompt("What's your name?");

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
});