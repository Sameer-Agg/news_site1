const API="c0397dbaecde4ae69ad971668092f1fc"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=> fetchnews("Entertainment"));

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apikey=${API}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}


function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardcontainer=document.getElementById("cards-container");
    const newstemplate=document.getElementById("template-news");
    
    cardcontainer.innerHTML="";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardclone = newstemplate.content.cloneNode(true);
        filldataincard(cardclone,article);
        cardcontainer.appendChild(cardclone);
    });
}


function filldataincard(cardclone,article) {
    const newsImg = cardclone.querySelector('#newsimg');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDisc = cardclone.querySelector('#news-dis');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDisc.innerHTML = article.description;

    //to convert date time in redable format

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}  ${date}`

    cardclone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank")
    })
}

let currSelectedNav=null;

function onNavItemclick(id){
    fetchnews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');

}

const searchbutton=document.getElementById('searchbutton');
const newstext=document.getElementById('newsinput');


searchbutton.addEventListener('click', ()=>{
    const query = newstext.value;
    if(!query) return;
    fetchnews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav= null;

})


const hamburger = document.querySelector(".ham");  
const navsub = document.querySelector(".mainmenu");  
hamburger.addEventListener('click', () => {  
 hamburger.classList.toggle("change")  
 navsub.classList.toggle("nav-change")  
});
