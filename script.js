const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //Set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}


// get Quote from api
async function getQuotes(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const res = await fetch(apiURL);
        apiQuotes = await res.json();
        newQuote();
    }catch(error){
        console.log(error);
        
    }
}
//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();