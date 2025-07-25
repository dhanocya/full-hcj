const APi_KEY = ""
const URL = ""

window.addEventListener("load", () => {
    fetchNews("india")
})

function road() {
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${URL}${query}&apiKey${APi_KEY}`)
    const data = await res.json()
    bindData(data.articles)
}

function bindData(articles) {
    const cardContiner = document.getElementById(`#card`);
    const newstemplate = document.getElementById(`#template`)

    cardContiner.innerHTML = ""

    articles.forEach(el =>{
        if(!articles.urltoimage) return;
        const cardClone = newstemplate.content.cloneNode(true)
        fildataCard(cardClone, articles)
        cardContiner.appendChild(cardClone)
    })
}


function fildataCard(cardClone, article){
    const newsImg = cardClone.querySlector(`.newsImg`)
    const newsTitle = cardClone.querySlector(`.newsTitle`)
    const newsSource = cardClone.querySlector(`.newsSource`)
    const newsDisc = cardClone.querySlector(`.newsDisc`)

    newsImg.src = article.urltoimage
    newsTitle.innerHTML = article.title
    newsDisc.innerHTML = article.description

    const date = new date(article.publishedAt).tolocalString("en-US",{
        timeZone: "Asia/jakarta"
    })

    newsSource.innerHTML =`${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.url,"_blank")
    })
}

let curSelectedNav = null
function navClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id)
    curSelectedNav?.classlist.remove("active")
    curSelectedNav = navItem
    curSelectedNav.classList.add(`active`)
}

const search = document.querySelector(`.search`)
const sebtn = document.querySelector(`.sebtn`)

sebtn.addEventListener("click", () =>{
    const query = search.value
    if (!query) return
    fetchNews(query)
    curSelectedNav?.classList.remove(`active`)
    curSelectedNav = null
})