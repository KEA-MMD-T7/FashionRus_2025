const mycategori = new URLSearchParams(window.location.search).get("category");
console.log("produtliste loader... med categori:", mycategori);

const productlist = document.querySelector(".list");
const overskrift = document.querySelector("h2");

overskrift.innerHTML = mycategori;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategori}`)
  .then((response) => response.json())
  .then(showProducts);

function showProducts(data) {
  console.log(data);
  markup = data
    .map(
      (element) =>
        `     <article class="smallProduct">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="product image" />
      <h3>${element.productdisplayname}</h3>
      <p class="subtle">${element.articletype} | ${element.brandname} </p>
      <p class="price">DKK <span>${element.price}</span>,-</p>
      <div class="discounted">
        <p>Now DKK <span></span>,-</p>
        <p><span></span>%</p>
      </div>
      <a href="product.html?productId=${element.id}">Read More</a>
    </article>`
    )
    .join("");
  console.log(markup);

  productlist.innerHTML = markup;
}
