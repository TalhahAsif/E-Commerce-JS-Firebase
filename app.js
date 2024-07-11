import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1vHKXx2fq4_n3SovJ3lN4fUmu0MTcezQ",
  authDomain: "my-1001-project.firebaseapp.com",
  projectId: "my-1001-project",
  storageBucket: "my-1001-project.appspot.com",
  messagingSenderId: "805674283226",
  appId: "1:805674283226:web:50a6b83d0d5ece8bb1f5e3",
  measurementId: "G-SXZTJF026S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

let signUpPageDisplay = true;
let loginPageDisplay = false;
let mainPageDisplay = false;

let signUpPage = document.getElementById("signUpPage");
let loginPage = document.getElementById("LoginPage");
let mainPage = document.getElementById("mainPage");
const loginLink = document.getElementById("loginLink");
const signUpLink = document.getElementById("signUpLink");

console.log(signUpPage);

const routing = () => {
  if (signUpPageDisplay == true) {
    signUpPage.style.display = "block";
  } else {
    signUpPage.style.display = "none";
  }

  if (loginPageDisplay == true) {
    loginPage.style.display = "block";
  } else {
    loginPage.style.display = "none";
  }

  if (mainPageDisplay == true) {
    mainPage.style.display = "block";
  } else {
    mainPage.style.display = "none";
  }
};

routing();

loginLink.addEventListener("click", () => {
  loginPageDisplay = true;
  signUpPageDisplay = false;
  mainPageDisplay = false;
  routing();
});

signUpLink.addEventListener("click", () => {
  loginPageDisplay = false;
  signUpPageDisplay = true;
  mainPageDisplay = false;
  routing();
});

const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signupBTN = document.getElementById("signupBTN");

signupBTN.addEventListener("click", createUserAccount);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is Logged in");
    const uid = user.uid;
  } else {
    console.log("User is not Logged in");
  }
});

function createUserAccount() {
  createUserWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
      signUpPageDisplay = false;
      mainPageDisplay = true;
      routing();
      alert("Account Created");
      signInEmail.value = "";
      signInPassword.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

const loginEmail = document.getElementById("LoginEmail");
const loginPassword = document.getElementById("LoginPassword");
const loginBTN = document.getElementById("LoginBTN");

loginBTN.addEventListener("click", loginUser);

function loginUser() {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      loginPageDisplay = false;
      mainPageDisplay = true;
      routing();
      loginEmail.value = "";
      loginPassword.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

const logOutBTN = document.getElementById("LogOutBTN");

logOutBTN.addEventListener("click", logout);

function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      loginPageDisplay = true;
      mainPageDisplay = false;
      routing();
    })
    .catch((error) => {
      // An error happened.
    });
}

// -------------------fetching Data------------------------

const fetchData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => console.log(res));
};

fetchData()