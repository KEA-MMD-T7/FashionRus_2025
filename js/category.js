console.log("category loader...");

const categorylist = document.querySelector(".categorylist");

fetch(`https://kea-alt-del.dk/t7/api/categories/`)
  .then((response) => response.json())
  .then(showCategori);

function showCategori(data) {
  console.log(data);
  markup = data.map((element) => `<a href="productlist.html?category=${element.category}">${element.category}</a>`).join("");
  console.log(markup);

  categorylist.innerHTML = markup;
}
