import React from 'react';
import { Link} from 'react-router-dom';

export class Login extends React.Component{

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
  
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
  
        var user = firebase.auth().currentUser;
  
        if(user != null){
  
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
        }
  
      } else {
        // No user is signed in.
  
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
  
      }
    });
  }

  login(){
  
      var userEmail = document.getElementById("email_field").value;
      var userPass = document.getElementById("password_field").value;
    
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    
        window.alert("Error : " + errorMessage);
    
        // ...
      });
  
  }
  
  logout(){
    firebase.auth().signOut();
  }
  
  render(){
        return <div className="col-6 ">
        <div id="login_div" className="main-div">
        <h3>Firebase Web login Example</h3>
        <input type="email" placeholder="Email..." id="email_field" />
        <input type="password" placeholder="Password..." id="password_field" />
    
        <button onClick={e => this.login()}>Login to Account</button>
      </div>
    
      <div id="user_div" className="loggedin-div">
        <h3>Welcome User</h3>
        <p id="user_para">Welcome to Firebase web login Example. You're currently logged in.</p>
        <p ><Link to="/Admin" >Go to Admin Page</Link></p>
        <button onClick={e => this.logout()}>Logout</button>
        
      </div>
      </div>
  }
}