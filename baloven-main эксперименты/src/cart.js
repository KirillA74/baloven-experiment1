let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
      <div class="cart-item">
        
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p id="pirog">${name}</p>
                <p class="cart-item-price">${price}р</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <img class="imgCart" width="180" src=${img} alt="" />
          <div class="buttonsCart">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3 id="kolvo">Количество ${item}, итого ${item * price}р</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Вы пока еще ничего не выбрали</h2>
    <a href="index.html">
      <button class="HomeBtn">Вернуться к выбору пирогов</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2 id="ttotal">Общая сумма заказа : ${amount}р</h2>
    <a href="index.html">
      <button class="HomeBtn">Вернуться к выбору пирогов</button>
    </a>
    <button onclick="clearCart()" class="removeAll">Очистить корзину</button>
    `;
  } else return;
};

TotalAmount();

// запись сотава корзины в виде массива из localStorage в input\textarea
document.getElementById("exampleFormControlTextarea2").value =
  localStorage.getItem("data");
// запись общей суммы заказа в input\textarea
document.getElementById("exampleFormControlTextarea3").value =
  document.getElementById("ttotal").innerHTML;

// состав корзины в человеческом виде
// document.getElementById("exampleFormControlTextarea4").value =
//   ShoppingCart.innerHTML;

// попытка
// let myOrder = localStorage.getItem("data");
// let text = myOrder.toString();
// document.getElementById("exampleFormControlTextarea4").value = text;
