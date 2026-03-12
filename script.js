const fruits = [
  {
    id: 1,
    imgSrc: "../Images/fruit-tangerine.png",
    name: "Tangerine",
    price: "$0.5",
  },
  {
    id: 2,
    imgSrc: "../Images/fruit-apple.png",
    name: "Apple",
    price: "$0.3",
  },
  {
    id: 3,
    imgSrc: "../Images/fruit-strawberry.png",
    name: "Strawberry",
    price: "$0.9",
  },
  {
    id: 4,
    imgSrc: "../Images/fruit-banana.png",
    name: "Banana",
    price: "$0.4",
  },
];

const cardRow = document.getElementById("cardsRow");

fruits.forEach((fruit) => {
  cardRow.innerHTML += `
       <div
                        class="col-12 col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
                        <div class="card w-100 border rounded-4">
                            <img src="${fruit.imgSrc}"
                                class="card-img-top object-fit-fill w-auto h-auto"
                                alt="tangerine" width="286" height="286"
                                id="tangerineImg">
                            <div class="card-body">
                                <p class="h5 card-title" id="tangerineName">${fruit.name}</p>
                                <p class="card-text">Price: ${fruit.price}<span
                                        id="tangerinePrice"></span></p>
                                <button href="#" class="btn btn-primary addToCart"
                                    id="tangerineAdd" data-id="${fruit.id}">Add to
                                    Cart</button>
                            </div>
                        </div>
                    </div>
    `;
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addToCart")) {
    const fruitId = Number(e.target.dataset.id);

    addToCart(fruitId);
  }
});

let cart = [];
const addToCart = (fruitId) => {
  const fruit = fruits.find((p) => p.id === fruitId);

  const existing = cart.find((e) => e.id === fruitId);

  if (existing) {
    cart.quantity += 1;
  } else {
    cart.push({ ...fruit, quantity: 1 });
  }

  renderCart();
  console.log(cart);
};

const renderCart = () => {
  const fruitCart = document.getElementById("fruitCart");

  fruitCart.innerHTML = `<ul class="list-unstyled">
            <li class="d-flex justify-content-between px-4"> <span>${cart.name}</span> <span>${cart.price}</span> <span>${cart.quantity}</span> </li>
        </ul>`;
};
