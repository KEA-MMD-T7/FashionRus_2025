# Implementering af filterfunktionalitet

## Del 1: Opsætning af UI og klargøring af EventListener

### 1. Opret en dropdownliste i HTML filen

Tilføj en `<select>` dropdownliste til at vælge et filter.

```html
<select id="filterProductList">
  <option value="all">Vis alle produkter</option>
  <option value="instock">Vis produkter på lager</option>
  <option value="discount">Vis produkter på udsalg</option>
  <option value="discountNotSoldout">
    Vis produkter på udsalg (ikke udsolgte)
  </option>
</select>
```

### 2. Opret en reference til dropdownlisten i javascript filen

Brug JavaScript til at referere til dropdownlisten:

```javascript
const filterSelect = document.querySelector("#filterProductList");
```

### 3. Tilføj en eventlistener

Lyt efter ændringer (brugeren vælger et nyt filter) i dropdownlisten:

```javascript
filterSelect.addEventListener("change", (event) => {
  showProduct(products, event);
});
```

## Del 2: Håndtering af produkter med fetch og filter

### 4. Hent og gem produkter i en variabel

```javascript
let products = undefined;

const fetchProducts = async () => {
  fetch("https://kea-alt-del.dk/t7/api/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showProduct(products);
    });
};

fetchProducts();
```

### 5. Opret en funktion til at vise produkter

Flyt produktvisningen fra `.then()` ind i en funktion:

```javascript
const productListContainer = document.querySelector("#productlistcontainer");

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
```

### 6. Vis alle produkter til at starte med

```javascript
fetchProducts();
```

### 7. Kald `showProduct()` i eventhandleren, for at vise en filtreret liste af produkter

```javascript
filterSelect.addEventListener("change", (event) => {
  showProduct(products, event);
});
```
