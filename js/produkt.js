const params = new URLSearchParams(window.location.search);
const productId = params.get("produktid"); // 1163, 1164
const productContainer = document.querySelector("#productContainer");
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);
  productContainer.innerHTML = `
    <figure class="relative">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp"
          alt="Produktbillede"
          class="productImage"
        />
        <span class="saleLabel">
        -${product.discount}%</span>
      </figure>
      <section class="productDetails">
        <h2 class="productName">${product.productdisplayname}</h2>
        <div>
        <p class="articleType"><span class="bold">Type:</span> ${product.articletype}</p>
          <p class="productCategory"><span class="bold">Kategori:</span> ${product.category}</p>
          <p class="productPrice"><span class="bold">Pris:</span> ${product.price},-</p>
        </div>
        <button class="buyButton">Køb nu</button>
      </section>
    `;
}
