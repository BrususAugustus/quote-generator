//A variable to store data in json format fetched from API
let quotes = [];

// DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//Spinner animations
const startLoadAnimation = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const endLoadAnimation = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//Shows New Quote
const newQuote = () => {
  startLoadAnimation();
  //Pick a random quote from apiQuotes array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteText.textContent = quote.text;

  //Check : Is authour null ? Yes-> Set to anonymous
  if (quote.text === null) {
    quoteText.textContent = "Anonymous";
  } else {
    quoteText.textContent = quote.text;
  }

  //Getting the author of the qyote
  authorText.textContent = quote.author;

  // Makes font smaller if the quote is too long
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  endLoadAnimation();
};

//Uses twitter API to tweet the quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

//Fetches data from API
async function getQuotes() {
  startLoadAnimation();

  const url = "https://type.fit/api/quotes";

  try {
    //Fetches the data and stores it in quotes variable
    const response = await fetch(url);
    quotes = await response.json();
    // console.log(newQuote())
  } catch (error) {
    getQuote();
    //console.log(error)
  }

  endLoadAnimation();
}

//Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
