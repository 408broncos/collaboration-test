const searchInput = document.querySelector("input[name='search']");
const searchSelect = document.querySelector("select[name='format']");
const searchSubmit = document.querySelector("input[name='submit']");
const searchForm = document.querySelector("form");
const searchResults = document.querySelector("#search-results");
const searchTermSpan = document.querySelector("#search-term");

const formatTypeArray = [
  "maps",
  "audio",
  "photos",
  "manuscripts",
  "newspapers",
  "film-and-videos",
  "notated-music",
  "websites",
];

for (let i = 0; i < formatTypeArray.length; i++) {
  let option = document.createElement("option");
  option.setAttribute("value", formatTypeArray[i]);
  option.textContent = formatTypeArray[i];
  searchSelect.appendChild(option);
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(event);
  console.log(event.srcElement);
  console.log(event.srcElement[0].value);
  console.log(event.srcElement[1].value);

  let searchTerm = event.srcElement[0].value;
  let formatTerm = event.srcElement[1].value;
  if (searchTerm) {
    let queryString =
      "https://www.loc.gov/" + formatTerm + "/?q=" + searchTerm + "&fo=json";

    fetch(queryString).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data.results);
          for (let i = 0; i < data.results.length; i++) {
            let title = document.createElement("h2");
            title.setAttribute("class", "card-title");
            title.textContent = data.results[i].title;

            let description = document.createElement("p");
            description.setAttribute("class", "card-text");
            description.textContent = data.results[i].description;

            let article = document.createElement("article");
            article.setAttribute("class", "card my-2 p-3");

            article.appendChild(title);
            article.appendChild(description);
            searchResults.appendChild(article);
          }
        });
      }
    });
  }
}

searchForm.addEventListener("submit", handleFormSubmit);
