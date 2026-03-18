const products = [
  {
    id: 1,
    imgSrc: "../Images/fruit-tangerine.png",
    name: "Tangerine",
    price: 0.5,
  },
  {
    id: 2,
    imgSrc: "../Images/fruit-apple.png",
    name: "Apple",
    price: 0.3,
  },
  {
    id: 3,
    imgSrc: "../Images/fruit-strawberry.png",
    name: "Strawberry",
    price: 0.9,
  },
  {
    id: 4,
    imgSrc: "../Images/fruit-banana.png",
    name: "Banana",
    price: 0.4,
  },
];

const productGrid = document.getElementById("product-grid");

productGrid.innerHTML = products
  .map(
    (product) =>
      `
       <div class="col-12 col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
          <div class="card w-100 border rounded-4">
            <img src="${product.imgSrc}"
              class="card-img-top object-fit-fill w-auto h-auto"
              alt="${product.name}" width="286" height="286">
            <div class="card-body">
              <p class="h5 card-title">${product.name}</p>
              <p class="card-text">Price: $${product.price.toFixed(2)}</p>
              <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
       </div>`,
  )
  .join("");

let shoppingCart = [];

const showNotificationToast = (message) => {
  const toastContainer = document.getElementById("notificationToast");
  const toastBody = toastContainer.querySelector(".toast-message");

  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastContainer);
  toast.show();
};

const addToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  const existingItem = shoppingCart.find((e) => e.id === productId);

  existingItem
    ? existingItem.quantity++
    : shoppingCart.push({ ...product, quantity: 1 });

  renderShoppingCart();
  showNotificationToast(`${product.name} has been added to your cart!`);
};

const renderShoppingCart = () => {
  const cartTableBody = document.getElementById("cart-table-body");
  const btnCheckout = document.getElementById("btn-checkout");

  const totalItemsCount = shoppingCart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalOrderValue = shoppingCart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  cartBadge.textContent = totalItemsCount;

  if (shoppingCart.length === 0) {
    cartTableBody.innerHTML = `
        <div class="text-center py-5">
            <p class="text-muted fs-5">Your cart is empty</p>
        </div>
    `;
    btnCheckout.disabled = true;
    return;
  }

  btnCheckout.disabled = false;
  cartTableBody.innerHTML = `
      <div class="table-responsive">
        <table class="table table-borderless">
          <thead class="d-none d-md-table-header-group">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${shoppingCart
              .map(
                (item) => `
            <tr class="cart-row d-flex justify-content-evenly align-items-center flex-sm-nowrap flex-wrap">
              <td class="py-2 d-flex align-items-center justify-content-center w-50 w-sm-auto">
                <span class="fw-bold py-md-2 py-0 text-center">${item.name}</span>
              </td>
              
              <td class="text-center d-flex d-md-table-cell align-items-center justify-content-center w-sm-auto w-50">
                <span class="d-flex align-items-center justify-content-center py-2">$${item.price.toFixed(2)}</span>
              </td>
              
              <td class="py-2 d-flex align-items-center justify-content-center w-sm-auto w-50">
                <div class="d-flex gap-1 align-items-center justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary btn-decrease-qty px-3" data-id="${item.id}">−</button>
                  <span class="fw-bold" style="width: 30px; text-align: center;">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary btn-increase-qty px-3" data-id="${item.id}">+</button>
                </div>
              </td>
              
              <td class="py-2 fw-bold d-none d-md-table-cell d-flex gap-1 align-items-center justify-content-center w-sm-auto w-50">
                <span class="d-flex align-items-center justify-content-center py-2">$${(item.price * item.quantity).toFixed(2)}</span>
              </td>
              
              <td class="py-2 text-end d-flex align-items-center justify-content-center w-sm-auto w-50">
                <button class="btn btn-sm btn-danger px-3 btn-remove-item" data-id="${item.id}">X</button>
              </td>
            </tr>
            
            <tr class="d-md-none border-bottom">
              <td colspan="4" class="py-3 text-end text-muted small">
                Total: <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
              </td>
            </tr>
          `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      
      <div class="px-2 py-3 mt-3 ">
        <h5 class="text-end fw-bold">Grand Total: $${totalOrderValue.toFixed(2)}</h5>
      </div>
    `;

  cartItemEventListeners();
};

const cartBadge = document.querySelector(".badge");
const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");

addToCartBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = Number(button.dataset.id);
    addToCart(productId);
  });
});

const cartItemEventListeners = () => {
  const increaseBtn = document.querySelectorAll(".btn-increase-qty");
  const decreaseBtn = document.querySelectorAll(".btn-decrease-qty");
  const removeBtn = document.querySelectorAll(".btn-remove-item");

  increaseBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number(button.dataset.id);
      const item = shoppingCart.find((i) => i.id === productId);
      if (item) item.quantity++;
      renderShoppingCart();
    });
  });

  decreaseBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number(button.dataset.id);
      const item = shoppingCart.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        shoppingCart = shoppingCart.filter((i) => i.id !== productId);
      }
      renderShoppingCart();
    });
  });

  removeBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number(button.dataset.id);
      shoppingCart = shoppingCart.filter((i) => i.id !== productId);
      renderShoppingCart();
    });
  });
};

document
  .getElementById("cartSummaryModal")
  .addEventListener("show.bs.modal", renderShoppingCart);

document.getElementById("btn-confirm-order").addEventListener("click", () => {
  const lottieContainer = document.querySelector(".lottieContainer");
  const mainContainer = document.querySelector(".container");

  mainContainer.classList.add("d-none");

  lottieContainer.innerHTML = `<h2 class="thankyou-text text-center mb-0 text-success">Order Placed, Thank You!</h2>`;

  if (shoppingCart.length > 0) {
    lottieContainer.classList.remove("d-none");

    let orderAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../Animation/order-placed.json",
    });

    orderAnimation.play();

    orderAnimation.addEventListener("complete", () => {
      lottieContainer.classList.add("d-none");
      mainContainer.classList.remove("d-none");

      orderAnimation.destroy();

      shoppingCart = [];
      renderShoppingCart();
    });
    cartBadge.textContent = "0";
  }
});
