console.log("iindex scirpt loaded");

fetch(`https://kea-alt-del.dk/t7/api/categories`)
  .then((response) => response.json())
  .then(showCategori);

function showCategori(data) {
  console.log("mine data er: ", data);

  const markup = data
    .map(
      (element) => `
  <li><a href="productlist.html?category=${element.category}">${element.category}</a></li>
  `
    )
    .join("");

  console.log("min markup er ", markup);
  document.querySelector("ul").innerHTML = markup;
}
