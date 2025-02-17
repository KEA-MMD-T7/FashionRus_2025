const category = new URLSearchParams(window.location.search).get("category");
const productlist = document.querySelector(".productlist main");
const overskrift = document.querySelector("h2");
document.querySelector("select").addEventListener("change", filtrer);

let endpoint = `https://kea-alt-del.dk/t7/api/products`;

if (category) {
  overskrift.innerHTML = category;
  endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
}

let allData, filtreretData;

function hentData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => (allData = data))
    .then((data) => showProducts(data));
}

hentData();

function showProducts(data) {
  console.log(data);
  markup = data
    .map(
      (element) =>
        //`<article class="smallProduct">
        `<article class="smallProduct ${element.soldout ? "soldOut" : ""}">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="product image" />
      <h3>${element.productdisplayname}</h3>
      <p class="subtle">${element.articletype} | ${element.brandname} </p>
      <p class="price">DKK <span>${element.price}</span>,-</p>
      ${
        element.discount &&
        `<div class="discounted">
        <p>Now DKK <span></span>,-</p>
        <p><span>${element.discount}</span>%</p>
      </div>`
      }
      <a href="product.html?productId=${element.id}">Read More</a>
    </article>`
    )
    .join("");
  productlist.innerHTML = markup;
}

function filtrer(e) {
  if (e.target.value == "all") {
    filtreretData = allData;
    overskrift.textContent = "All";
  } else if (e.target.value == "onsale") {
    filtreretData = allData.filter((elm) => elm.discount);
    overskrift.textContent = "On Sale";
  }
  showProducts(filtreretData);
}
