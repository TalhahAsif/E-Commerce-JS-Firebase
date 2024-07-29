import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  signOut,
  getAuth,
  app,
  db,
  auth,
  setDoc,
  getDocs,
} from "./firebase.js";

console.log(onAuthStateChanged);

let signUpPageDisplay = false;
let loginPageDisplay = false;
let mainPageDisplay = true;

let signUpPage = document.getElementById("signUpPage");
let loginPage = document.getElementById("LoginPage");
let mainPage = document.getElementById("mainPage");
let cartPage = document.getElementById("cartPage");

const loginLink = document.getElementById("loginLink");
const signUpLink = document.getElementById("signUpLink");

let userEmailBx = document.getElementById("userEmailBx");

userEmailBx.innerHTML = localStorage.getItem("currentUser");

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

const logOutBTN = document.getElementById("LogOutBTN");
const mainPageLogInBTN = document.getElementById("LogInBTN");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is Logged in");
    const uid = user.uid;
    mainPageLogInBTN.style.display = "none";
    logOutBTN.style.display = "block";
  } else {
    console.log("User is not Logged in");
    mainPageLogInBTN.style.display = "block";
    logOutBTN.style.display = "none";
  }
});

// console.log(currentUser);

function createUserAccount() {
  createUserWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
    .then((userCredential) => {
      localStorage.setItem("currentUser", signInEmail.value);
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
      localStorage.setItem("currentUser", loginEmail.value);
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

logOutBTN.addEventListener("click", logout);
mainPageLogInBTN.addEventListener("click", mainPagelogin);

function logout() {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("currentUser");
      // Sign-out successful.
      loginPageDisplay = true;
      mainPageDisplay = false;
      routing();
    })
    .catch((error) => {
      // An error happened.
    });
}

function mainPagelogin() {
  console.log("click");
  loginPageDisplay = true;
  mainPageDisplay = false;
  routing();
}

// -------------------fetching Data------------------------

const cardBox = document.getElementById("cardBox");
const body = document.getElementById("body");
// const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const staticModal = document.getElementById("static-modal");

const fetchData = async () => {
  let data;
  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => {
      data = res;
    });

  console.log(data);

  data.forEach((product, index) => {
    const card = `
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="pb-8 rounded-t-lg h-96 w-full" src="${product.image}" alt="product image" />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse" id="ratingBox-${index}">
        </div>
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${product.rating.rate} / 5</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">$${product.price}</span>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onclick="showProductDetails(${product.id})">More Details</button>
      </div>
    </div>
  </div>
  `;

    cardBox.innerHTML += card;

    const rating = Math.round(product.rating.rate);
    const ratingBox = document.getElementById(`ratingBox-${index}`);

    if (ratingBox != null) {
      for (let i = 0; i < rating; i++) {
        const ratingStar = `<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>`;
        ratingBox.innerHTML += ratingStar;
      }
    }
  });
};

fetchData();

window.showProductDetails = async (productId) => {
  let product;
  await fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((res) => {
      product = res;
    });

  let quantityCount = 0;

  body.classList += " overflow-hidden";

  modalBody.innerHTML = `
  <img src="${product.image}" alt="${
    product.title
  }" class="w-96 h-96 rounded-2xl" />
  <div class="flex flex-col gap-3 mx-6">
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">${product.category.toUpperCase()}</p>
  <p class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
    product.title
  }</p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">${
    product.description
  }</p>
  <div class="flex items-center">
  <div id="ratingBox" class="flex gap-1"></div>
  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${
    product.rating.rate
  } / 5</span>
  </div>
    <p class="text-3xl font-bold text-gray-900 dark:text-white">$${
      product.price
    }</p>
    <section class="flex justify-between flex">
      <div class="flex items-center gap-6">
      <button id="decreament" onclick='quantityCounter("decr")' class="text-3xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg font-bolder px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">-
      </button>
      <p id="quantity" class="text-3xl font-bold text-gray-900 dark:text-white">${quantityCount}</p>
      <button id="increament" onclick='quantityCounter("incr")' class="text-3xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg font-bolder px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
      </div>
      <div class="flex gap-3 items-center p-4 md:p-5 rounded-b">
                <button data-modal-hide="static-modal" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Close</button>
                <button id="addToCart_BTN" data-modal-hide="static-modal" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Add to Cart</button>
              </div>
    </section>
    </div>
  `;

  // Show the modal
  staticModal.classList.remove("hidden");
  staticModal.classList.add("flex");

  const ratingStar = `<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>`;
  const rating = Math.round(product.rating.rate);
  const ratingBox = document.getElementById("ratingBox");

  for (let i = 0; i < rating; i++) {
    ratingBox.innerHTML += ratingStar;
  }

  const increament = document.getElementById("increament");
  const decreament = document.getElementById("decreament");
  const quantity = document.getElementById("quantity");

  window.quantityCounter = (value) => {
    if (value == "incr") {
      quantityCount++;
    } else {
      quantityCount--;
    }
    quantity.innerHTML = quantityCount;
    disableFunc();
  };

  decreament.disabled = true;

  const disableFunc = () => {
    if (quantityCount == 0) {
      decreament.disabled = true;
    } else {
      decreament.disabled = false;
    }
  };

  const addToCart_BTN = document.getElementById("addToCart_BTN");

  addToCart_BTN.addEventListener("click", async (e) => {
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    if (!currentUser) {
      alert("Please Sign Up to continue");
    } else if (quantityCount == 0) {
      alert("Quantity must be more then 1");
    } else {
      alert("product added to cart succesfully")
      const docRef = await addDoc(collection(db, "product"), {
        email: currentUser,
        product: product,
        quantity: quantityCount,
      });
      console.log("Document written with ID: ", docRef.id);
    }

  });
};

// Event listener to hide the modal
staticModal.addEventListener("click", (e) => {
  if (
    e.target === staticModal ||
    e.target.dataset.modalHide === "static-modal"
  ) {
    staticModal.classList.add("hidden");
    staticModal.classList.remove("flex");
    body.classList.remove("overflow-hidden");
  }
});

const productPage = document.getElementById("product-page");
const btnBox = document.getElementById("moreInfoBtnBox");
console.log(btnBox);

// window.togler = function (category) {
//   JSON.parse(category)
// };

window.togler = async (praductId) => {
  let product;
  console.log(praductId);
  await fetch(`https://fakestoreapi.com/products/${praductId}`)
    .then((res) => res.json())
    .then((res) => {
      product = res;
    });

  console.log(product);
};
