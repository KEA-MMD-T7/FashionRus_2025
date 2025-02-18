# Implementering af filterfunktionalitet i HTML og JavaScript

## Del 1: Opsætning af UI og EventListener

### 1. Opret en dropdownliste
Tilføj en `<select>` dropdownliste til at vælge et filter.

```html
<select id="filterProductList">
  <option value="all">Vis alle produkter</option>
  <option value="instock">Vis produkter på lager</option>
  <option value="discount">Vis produkter på udsalg</option>
  <option value="instockDiscount">Vis produkter på udsalg (ikke udsolgte)</option>
  <option value="soldout">Vis udsolgte produkter</option>
</select>
```

### 2. Opret en reference til dropdownlisten
Brug JavaScript til at referere til dropdownlisten:

```javascript
const filterSelect = document.querySelector("#filterProductList");
```

### 3. Tilføj en eventlistener
Lyt efter ændringer i dropdownlisten:

```javascript
filterSelect.addEventListener("change", (event) => {
  // Funktionen showProduct opretter vi i punkt 5
  showProduct(products, event);
});
```

## Del 2: Håndtering af produkter med fetch og filter

### 4. Hent produkter og gem i en variabel

```javascript
let products = fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => data);
```

### 5. Opret en funktion til at vise produkter
Flyt produktvisningen fra `.then()` ind i en funktion:

```javascript
let productListContainer = document.querySelector("#productlistcontainer");

function showProduct(products, event) {
  products.then((products) => {
    let markup = products
      .filter((product) => {
        if (event) {
          if (event.target.value == "all") {
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
        (product) =>
          `<article class="smallProduct ${product.discount ? "onSale" : ""} ${
            product.soldout ? "soldOut" : ""
          }">
            <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="product image"
            />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">${product.articletype} | ${product.brandname}</p>
            <p class="price">DKK <span>${product.price}</span>,-</p>
            ${
              product.discount
                ? `<div class="discounted">
                    <p>Now DKK <span>${Math.floor((product.price * (100 - product.discount)) / 100)}</span>,-</p>
                    <p><span>${product.discount}</span>%</p>
                  </div>`
                : ""
            }
            <a href="product.html?produktid=${product.id}">Read More</a>
        </article>`
      )
      .join("");
    productListContainer.innerHTML = markup;
  });
}
```

### 6. Vis produkter ved initial render

```javascript
showProduct(products);
```

### 7. Kald `showProduct()` i eventhandleren

```javascript
filterSelect.addEventListener("change", (event) => {
  showProduct(products, event);
});
```
