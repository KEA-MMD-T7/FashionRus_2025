const productListContainer = document.querySelector("#productlistcontainer");
const filterSelect = document.querySelector("#filterProductList");
let products = undefined;

const showProduct = (products, event) => {
  let markup = products
    .filter((product) => {
      if (event) {
        if (event.target.value == "discount") {
          return product.discount;
        } else if (event.target.value == "soldout") {
          return product.soldout;
        } else if (event.target.value == "discountNotSoldout") {
          return product.discount && !product.soldout;
        } else {
          return true;
        }
      } else {
        return true;
      }
    })
    .map(
      (product) => /*html*/ `<article
            class="smallProduct ${product.discount && "onSale"} ${
        product.soldout && "soldOut"
      }"
          >
            <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="product image"
            />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">${product.articletype} | ${product.brandname}</p>
            <p class="price">DKK <span>${product.price}</span>,-</p>
            <div class="discounted">
              <p>
                Now DKK
                <span
                  >${Math.floor((product.price * product.discount) / 100)}</span
                >,-
              </p>
              <p><span>${product.discount}</span>%</p>
            </div>
            <a href="product.html?produktid=${product.id}">Read More</a>
          </article>`
    )
    .join("");
  productListContainer.innerHTML = markup;
};

const fetchProducts = async () => {
  fetch("https://kea-alt-del.dk/t7/api/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showProduct(products);
    });
};

fetchProducts();

filterSelect.addEventListener("change", (event) => {
  showProduct(products, event);
});
