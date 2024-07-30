import { getDocs, collection, db, deleteDoc, doc } from "./firebase.js";

const cartItemsBx = document.getElementById("cartItems");
const userEmailBx = document.getElementById("userEmailBx");

userEmailBx.innerHTML = localStorage.getItem("currentUser");

const displayCartItems = async () => {
  let totalAm = 0;
  const cartItems = await getDocs(collection(db, "product"));
  console.log(cartItems);
  cartItems.forEach((items) => {
    const itemKey = items._document.key.path.segments[6];
    if (items.data().email == localStorage.getItem("currentUser")) {
      totalAm += items.data().product.price * items.data().quantity;
    }else{
      totalAm = 0.00
    }
    console.log(totalAm.toFixed(2));
    const currentEmail = localStorage.getItem("currentUser");
    if (items.data().email == currentEmail) {
      const product = items.data().product;
      const itemCard = ` <div
        class="xl:w-2/3 flex flex-col bg-white rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-96 rounded-t-lg h-auto md:h-96 md:rounded-none md:rounded-s-lg"
          src='${product.image}' alt="">
        <div class="flex flex-col justify-between px-6 py-5 h-96 w-full">
        <section class="">
          <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${
            product.title
          }</h5>
          <span class="text-lg font-bold text-gray-900 dark:text-white">$${
            product.price
          }</span>
          <div class="flex items-center pt-5"><p class="mb-3 font-normal text-gray-700 dark:text-gray-400">x ${
            items.data().quantity
          } <span class="text-3xl font-bold text-gray-900 dark:text-white">$${
        product.price * items.data().quantity.toFixed(2)
      }</span></p>
            </div>
        </section>
      <button id="deleteItemBTN" value='${itemKey}' class="bg-red-600 text-white rounded p-3 w-2/5">delete</button>
        </div>
      </div>`;
      cartItemsBx.innerHTML += itemCard;
    }
  });
  
  const items = cartItems.docs
  console.log(items);

  // items.forEach((items)=>{
  //   console.log(items);
  //   if (!items) {
  //     cartItemsBx.innerHTML = `<p class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Cart Is Empty</p>`;
  //   }else{
   
  //   }
  // })
  

  const totalAmBx = document.getElementById("totalAm");

  totalAmBx.innerHTML = `total Amount : $${totalAm.toFixed(2)}`;

  const deleteItemBTN = document.getElementById("deleteItemBTN");

  deleteItemBTN &&
    deleteItemBTN.addEventListener("click", async (e) => {
      const itemId = e.target.value;  
      await deleteDoc(doc(db, "product", itemId))
      console.log("deleted");
      displayCartItems();
    });
};

displayCartItems();
