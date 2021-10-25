const firebaseConfig = {
      apiKey: "AIzaSyABbCaxcIJhgcA7CwTOK7Dx1gZG-jxMYI8",
      authDomain: "kwitter-twitter-f85ad.firebaseapp.com",
      databaseURL: "https://kwitter-twitter-f85ad-default-rtdb.firebaseio.com",
      projectId: "kwitter-twitter-f85ad",
      storageBucket: "kwitter-twitter-f85ad.appspot.com",
      messagingSenderId: "833558578201",
      appId: "1:833558578201:web:9b95d27b9dcf267f4b9688",
      measurementId: "G-ML9RBMQQVJ"
    };

    firebase.initializeApp(firebaseConfig);
username=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="WELCOME "+username+"!";
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
row=" <div class='room_name' id= "+Room_names+" onclick='redirectToRoomName(this.id)'> #"+Room_names+"</div> <hr>";
document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function redirectToRoomName(name) {
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function addroom() {
  room_name=document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
        purpose:"adding room name"
  });
  localStorage.setItem("room_name",room_name);
  window.location="kwitter_page.html";  
}

function logout() {
     localStorage.removeItem("room_name") ;
     localStorage.removeItem("user_name");
     window.location="index.html";
}