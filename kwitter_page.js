const firebaseConfig = {
      apiKey: "AIzaSyABbCaxcIJhgcA7CwTOK7Dx1gZG-jxMYI8",
      authDomain: "kwitter-twitter-f85ad.firebaseapp.com",
      databaseURL: "https://kwitter-twitter-f85ad-default-rtdb.firebaseio.com",
      projectId: "kwitter-twitter-f85ad",
      storageBucket: "kwitter-twitter-f85ad.appspot.com",
      messagingSenderId: "833558578201",
      appId: "1:833558578201:web:9b95d27Hb9dcf267f4b9688",
      measurementId: "G-ML9RBMQQVJ"
    };

    firebase.initializeApp(firebaseConfig);
room_name=localStorage.getItem("room_name");
user_name=localStorage.getItem("user_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name =message_data['name'];
message = message_data['message'];
like= message_data['like'];
name_with_tag= "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message+"</h4>";
like_button ="<button class ='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like:"+ like +"</span></button><hr>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function send() {
    message=document.getElementById("Message").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:message,
          like:0
    }); 
    document.getElementById("Message").value="";
    
}

function updateLike(message_id){
      console.log("clicked on the like button - " + message_id);
      button_id= message_id;
      likes = document.getElementById(button_id).value;
      updated_likes=Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout(){
      localStorage.removeItem("room_name") ;
     localStorage.removeItem("user_name");
     window.location="index.html";
}