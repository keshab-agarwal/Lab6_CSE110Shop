// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    const template = document.createElement('template');
     template.innerHTML = `
     <style>
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
     </style>`;
    

    super();
    
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    var item = JSON.parse(newVal);
    let li = document.createElement('li');
    let img = document.createElement('img');
    let para1 = document.createElement('p');
    let para2 = document.createElement('p');
    var button = document.createElement('button');
    li.setAttribute("class", "product");
    var x = JSON.parse(localStorage.getItem("cart"));
    if(x.includes(String(item.id))){
      button.innerHTML = "Remove from Cart!";
    }
    else{
      button.innerHTML = "Add to Cart!";
    }
    button.setAttribute("id", item.id);
    button.setAttribute("onclick", `
    let cart = document.getElementById("cart-count");
    if (this.innerHTML == 'Remove from Cart!'){
      alert("Removed item from cart!");
      this.innerHTML = "Add to Cart!";
      var x = JSON.parse(localStorage.getItem("cart"));
      x.splice(x.indexOf(this.id), 1);
      localStorage.setItem("cart", JSON.stringify(x));
      cart.innerHTML = Number(cart.innerHTML) - 1;
    }
    else{
      this.innerHTML = "Remove from Cart!";
      alert("Added item to cart");
      var x = JSON.parse(localStorage.getItem("cart"));
      x.push(this.id);
      localStorage.setItem("cart", JSON.stringify(x));
      cart.innerHTML = Number(cart.innerHTML) + 1;
    }`);
    img.src = item.image;
    img.alt = item.title;
    img.width = 200;
    para1.setAttribute("class", "title");
    para1.innerHTML = item.title;
    para2.setAttribute("class", "price");
    para2.innerHTML = item.price;
    para1.setAttribute("class", "title");
    li.appendChild(img);
    li.appendChild(para1);
    li.appendChild(para2);
    li.appendChild(button);
    this.root.appendChild(li);
  }
  static get observedAttributes() {
    return ['item'];
  }
  get item() {
    return this.getAttribute('item');
  }
  set item(newValue) {
    this.setAttribute('item', newValue);
  }

  connectedCallback() {
  }
}

customElements.define('product-item', ProductItem);