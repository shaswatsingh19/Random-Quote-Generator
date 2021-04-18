const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


// show loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// .hidden = true => to show

function complete(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}
// get Quote from API
async function getQuote(){
    const proxyURL = 'https://stormy-refuge-95707.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{

        loading(); // loader=> show and quote container => hidden
        const response = await fetch(proxyURL+apiURL);
        const data = await response.json();
        // console.log(response);
        console.log(data)   
        if( data.quoteAuthor === ''){// for condition when there is no author
            authorText.innerHTML = 'Unknown';
        }else{ authorText.innerHTML = data.quoteAuthor;        }
        
        // if quote length is greater than 60 then add a class to span element in html dynamically
        if( data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
            console.log(data.quoteText.length)
        }else{
            quoteText.classList.remove('long-quote');}
        quoteText.innerHTML = data.quoteText;

        complete();
    } catch(error){
        
        getQuote();
        // for when we get error due to some token then it automatically render a new quote
        console.log("Sorry no quotes",error);
    }

    
}

// tweet function
function tweetQuote(){
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // const twitterURL = 'https://twitter.com/intent/tweet?text='+quote + ' - ' + author;
    console.log(twitterURL)
    window.open(twitterURL,"_blank")
}



// Event listner 
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);





// load function 
getQuote();
loading();