const productList = document.querySelector("#showProductList  ");
fetch("https://kea-alt-del.dk/t7/api/products/")
  .then((response) => response.json())
  .then((products) => {
    let markup = products
      .map((product) => {
        return `
          <article class="smallProduct ${product.discount && "onSale"} ${
          product.soldout && "soldOut"
        }">
            <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="product image"
            />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">${product.articletype} | ${product.brandname}</p>
            <p class="price">DKK <span>${product.price}</span>,-</p>
            <div class="discounted">
              <p>Now DKK <span>${Math.floor(
                product.price * (1 - product.discount / 100)
              )}</span>,-</p>
              <p><span>${product.discount}</span>%</p>
            </div>
            <a href="product.html?productId=${product.id}">Read More</a>
          </article>`;
      })
      .join("");
    productList.innerHTML = markup;
  });
