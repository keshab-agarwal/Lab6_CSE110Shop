// Script.js

window.addEventListener('DOMContentLoaded', () => {
  var ids = [];
  if(localStorage.getItem("cart") == null){
    localStorage.setItem("cart", JSON.stringify(["no-element"]));
  }
  var cart = JSON.parse(localStorage.getItem("cart"));
  fetch('https://fakestoreapi.com/products').then((resp) => resp.json()).then(function(data){
    for(let i = 0; i < data.length; ++i){
      ids.push(data[i].id);
      localStorage.setItem(data[i].id, JSON.stringify(data[i]));
    }
    const ul = document.getElementById("product-list");
    for(let i = 0; i < ids.length; ++i){
      let li = document.createElement("product-item");
      li.setAttribute("item", localStorage.getItem(ids[i]));
      ul.appendChild(li);
      document.getElementById("cart-count").innerHTML = cart.length - 1;
    }
  });
});