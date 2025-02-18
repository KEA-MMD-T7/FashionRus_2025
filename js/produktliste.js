const productListContainer = document.querySelector("#productlistcontainer");
const filterSelect = document.querySelector("#filterProductList");

const products = fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => data);

function showProduct(products, event) {
  products.then((products) => {
    let markup = products
      .filter((product) => {
        if (event) {
          if (event.target.value == "all") {
            // Return true betyder at alle produkter kommer med i det filtrerede resultat!
            return true;
          } else if (event.target.value == "discount") {
            return product.discount;
          } else if (event.target.value == "soldout") {
            return product.soldout;
          } else if (event.target.value == "instock") {
            return !product.soldout;
          } else if (event.target.value == "instockDiscount") {
            return !product.soldout && product.discount;
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
  });
}
// vis alle produkter på siden til at starte med
showProduct(products);
// når et filter vælges - sorter produkt listen så den matcher det valgte filter
filterSelect.addEventListener("change", (event) => {
  showProduct(products, event);
});
