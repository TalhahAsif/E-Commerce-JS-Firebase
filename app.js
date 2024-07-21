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

let signUpPageDisplay = false;
let loginPageDisplay = false;
let mainPageDisplay = true;
let ProductPage = false;

let signUpPage = document.getElementById("signUpPage");
let loginPage = document.getElementById("LoginPage");
let mainPage = document.getElementById("mainPage");
const loginLink = document.getElementById("loginLink");
const signUpLink = document.getElementById("signUpLink");

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

const cardBox = document.getElementById("cardBox");

const fetchData = async () => {
  let data;
  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => {
      data = res;
    });

  data.forEach((data) => {
    const image = JSON.stringify(data.image)
    console.log(image);
    // const productData = [
    //   JSON.stringify(data.id),
    //   JSON.stringify(data.category),
    //   JSON.stringify(data.description),
    //   JSON.stringify(data.image),
    //   JSON.stringify(data.price),
    //   JSON.stringify(data.rating.count),
    //   JSON.stringify(data.rating.rate),
    //   JSON.stringify(data.title),
    // ];

    const card = ` <div id="card" class="rounded-2xl bg-slate-900 w-96 h-max m-3">
    <div>
      <img 
        src=${data.image}
        alt=""
        class="w-full rounded-t-2xl h-96"
      />
    </div>
    <div class="p-5">
      <p class="text-xl font-bold">${data.title}</p>
      <p class="text-lg font-bold">$25</p>
      <p class="text-lg">
        ${
          data.description.length > 100
            ? data.description.slice(0, 200)
            : data.description
        }
      </p>
      <div id="moreInfoBtnBox" class="flex items-end">
       <button
        id="${data.id}"
        class="font-bold btn text-black p-2 rounded-lg w-full bg-sky-400 mt-6 moreInfoBtn"
        onclick="togler(${image})"
      > 
        more info...
      </button>
      </div>
     
    </div>
  </div>`;

    cardBox.innerHTML += card;
  });
};

const productPage = document.getElementById("product-page");
const btnBox = document.getElementById("moreInfoBtnBox");
console.log(btnBox);

window.togler = function (image) {
  JSON.parse(image)
};

fetchData();
