// Remember to replace "YOUR_API_KEY" with your actual key from newsapi.org
const API_KEY = "1dd445ba574c4d5f8e407466ddcc1f19";
const url = `https://newsapi.org/v2/everything?q=`;

window.addEventListener("load", () => {
  fetchNews("india");
});

function road() {
  window.location.reload();
}

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    if (!res.ok) {
        console.error("Failed to fetch news:", res.status);
        return;
    }
    const data = await res.json();
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function bindData(articles) {
  const cardContainer = document.getElementById("card");
  // FIXED: Correctly selected the template element by its ID without the '#'
  const newsTemplate = document.getElementById("template");

  cardContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    cardContainer.innerHTML = "<p>No articles found. Please try another search.</p>";
    return;
  }

  articles.forEach(article => {
    // FIXED: Checked the individual 'article' for an image, not the whole 'articles' array
    // Also, articles without an image will be skipped.
    if (!article.urlToImage) return;

    const cardClone = newsTemplate.content.cloneNode(true);
    // FIXED: Passed the individual 'article' to the fill function, not the whole 'articles' array
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  // FIXED: Corrected typo from 'querySlector' to 'querySelector'
  const newsImg = cardClone.querySelector(`.newsImg`);
  const newsTitle = cardClone.querySelector(`.newsTitle`);
  const newsSource = cardClone.querySelector(`.newsSource`);
  const newsDisc = cardClone.querySelector(`.newsDisc`);

  // FIXED: Used the correct case-sensitive property 'urlToImage'
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDisc.innerHTML = article.description;

  // FIXED: Corrected capitalization for 'new Date()' and 'toLocaleString()'
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function navClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add(`active`);
}

const searchInput = document.querySelector(`.search`);
const searchButton = document.querySelector(`.sebtn`);

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove(`active`);
  curSelectedNav = null;
});