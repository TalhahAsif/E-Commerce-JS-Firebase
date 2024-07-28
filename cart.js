import { getDocs, collection, db } from "./firebase.js";

const cartItemsBx = document.getElementById("cartItems");
const userEmailBx = document.getElementById("userEmailBx");

userEmailBx.innerHTML = localStorage.getItem("currentUser");

const displayCartItems = async () => {
  const cartItems = await getDocs(collection(db, "product"));
  cartItems.forEach((items) => {
    console.log(items.data());
    const currentEmail = localStorage.getItem("currentUser");
    if (items.data().email == currentEmail) {
      const product = items.data().product;
      const itemCard = ` <div
        class="xl:w-screen flex flex-col items-center bg-white border rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-96 rounded-t-lg h-96 md:h-96 md:w-96 md:rounded-none md:rounded-s-lg"
          src='${product.image}' alt="">
        <div class="flex flex-col justify-between p-5 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
            product.title
          }</h5>
          <span class="text-lg font-bold text-gray-900 dark:text-white">$${
            product.price
          }</span>
          <div class="flex items-center pt-5"><p class="mb-3 font-normal text-gray-700 dark:text-gray-400">x ${
            items.data().quantity
          } <span class="text-3xl font-bold text-gray-900 dark:text-white">$${
        product.price * items.data().quantity
      }</span> </p></div>
        </div>
      </div>`;
      if (!items.data()) {
        cartItemsBx.innerHTML = `<p>Cart Is Empty</p>`  
      }
      cartItemsBx.innerHTML += itemCard;
    }

  });
};

displayCartItems();
