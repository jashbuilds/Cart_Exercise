const fruits = [
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

const cardRow = document.getElementById("cardsRow");

cardRow.innerHTML = fruits
  .map(
    (fruit) =>
      `
       <div class="col-12 col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
          <div class="card w-100 border rounded-4">
            <img src="${fruit.imgSrc}"
              class="card-img-top object-fit-fill w-auto h-auto"
              alt="${fruit.name}" width="286" height="286">
            <div class="card-body">
              <p class="h5 card-title">${fruit.name}</p>
              <p class="card-text">Price: $${fruit.price.toFixed(2)}</p>
              <button class="btn btn-primary addToCart" data-id="${fruit.id}" id="liveToastBtn">Add to Cart</button>
            </div>
          </div>
       </div>`,
  )
  .join("");

let cart = [];

// const showToast = (message) => {
//   const toastBody = document.querySelector(".toast");
//   const liveToast = document.querySelector(".toast-msg");

//   toastBody.textContent = message;

//   const toastTrigger = new bootstrap.Toast(liveToast);

//   toastTrigger.show();
// };

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addToCart")) {
    const fruitId = Number(e.target.dataset.id);

    addToCart(fruitId);
  }

  if (e.target.classList.contains("increaseQty")) {
    const fruitId = Number(e.target.dataset.id);
    const item = cart.find((i) => i.id === fruitId);
    if (item) {
      item.quantity++;
      renderCart();
    }
  }

  if (e.target.classList.contains("decreaseQty")) {
    const fruitId = Number(e.target.dataset.id);
    const item = cart.find((i) => i.id === fruitId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter((i) => i.id !== fruitId);
    }
    renderCart();
  }

  if (e.target.classList.contains("deleteItem")) {
    const fruitId = Number(e.target.dataset.id);
    cart = cart.filter((i) => i.id !== fruitId);
    renderCart();
  }
});

const addToCart = (fruitId) => {
  const fruit = fruits.find((p) => p.id === fruitId);
  const existing = cart.find((e) => e.id === fruitId);

  existing ? existing.quantity++ : cart.push({ ...fruit, quantity: 1 });

  renderCart();

  // showToast(`${fruit.name} is added to cart`);
};

const badge = document.querySelector(".badge");
const renderCart = () => {
  const fruitCart = document.getElementById("fruitCart");
  const orderNowBtn = document.getElementById("orderNowBtn");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  badge.textContent = totalItems;

  if (cart.length === 0) {
    fruitCart.innerHTML = `
        <div class="text-center py-5">
            <p class="text-muted fs-5">Your cart is empty</p>
        </div>
    `;
    orderNowBtn.disabled = true;
    // orderNowBtn.style.cursor = "not-allowed"
    return;
  }

  orderNowBtn.disabled = false;
  fruitCart.innerHTML = `
      <div class="table-responsive">
        <table class="table table-borderless">
          <thead class="d-none d-md-table-header-group">
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${cart
              .map(
                (item) => `
            <tr class="border-bottom">
              <td class="py-2 d-flex align-items-center justify-content-center">
                <span class="fw-bold">${item.name}</span>
                <div class="d-md-none text-muted small">$${item.price.toFixed(2)}</div>
              </td>
              
              <td class="py-2 d-flex d-md-table-cell align-items-center justify-content-center">
                $${item.price.toFixed(2)}
              </td>
              
              <td class="py-2 d-flex align-items-center justify-content-center">
                <div class="d-flex gap-1 align-items-center justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary decreaseQty px-3" data-id="${item.id}">−</button>
                  <span class="fw-bold" style="width: 30px; text-align: center;">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary increaseQty px-3" data-id="${item.id}">+</button>
                </div>
              </td>
              
              <td class="py-2 fw-bold d-md-table-cell d-flex gap-1 align-items-center justify-content-center">
                $${(item.price * item.quantity).toFixed(2)}
              </td>
              
              <td class="py-2 text-end d-flex align-items-center justify-content-center">
                <button class="btn btn-sm btn-danger px-3 deleteItem" data-id="${item.id}">X</button>
              </td>
            </tr>
            
            <tr class="d-md-none">
              <td colspan="4" class="py-1 text-end text-muted small">
                Total: <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
              </td>
            </tr>
          `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      
      <div class="px-2 py-3 mt-3 border-top">
        <h5 class="text-end fw-bold">Grand Total: $${grandTotal.toFixed(2)}</h5>
      </div>
    `;
};

document
  .getElementById("exampleModalToggle")
  .addEventListener("show.bs.modal", () => {
    renderCart();
  });

document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  const container = document.querySelector(".lottieContainer");

  document.querySelector(".container").style.display = "none";


  if (cart.length > 0) {
    container.style.display = "block";
    let animation = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../Animation/order-placed1.json",
    });
    animation.play();

    animation.addEventListener("complete", () => {
      container.style.display = "none";
      document.querySelector(".container").style.display = "block";

      cart = [];
    });
    badge.textContent = "";
  }
  setTimeout(() => {
    window.location.reload();
  }, 5000);
});
