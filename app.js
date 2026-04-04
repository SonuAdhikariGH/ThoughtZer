const quoteArr = JSON.parse(localStorage.getItem("quoteArr")) || [];
const thoughtMain = document.querySelector("#thoughtMain");
const authorName = document.querySelector("#authorName");
const generateThoughtBtn = document.querySelector("#generateThoughtBtn");
const preQuoteText = document.querySelector("#preQuoteText");
const btnContainer = document.querySelector("#btnContainer");
const quoteLi = document.querySelector("#quoteLi");
const preSkeleton = document.querySelector("#preSkeleton");

// btn event handler
async function generateThoughtHandler(e) {
  e.preventDefault();

  thoughtMain.textContent = "Fetching Wisdom...";
  authorName.textContent = "";
  preQuoteText.textContent = "";

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    thoughtMain.textContent = data.quote;
    authorName.textContent = `~${data.author}`;
    generateThoughtBtn.innerHTML = `Refresh`;
  } catch (err) {
    console.error(err);
  }
}

let saveQuoteBtn = document.querySelector(".saveQuoteBtn");

if (!saveQuoteBtn) {
  saveQuoteBtn = document.createElement("button");
  saveQuoteBtn.className = "saveQuoteBtn";
  saveQuoteBtn.innerHTML = `Save Quote`;
  btnContainer.appendChild(saveQuoteBtn);
}

// saveQuoteBtn event handler
saveQuoteBtn.addEventListener("click", (e) => {
  preSkeleton.textContent = "";
  e.preventDefault();
  let quote = {
    quote: thoughtMain.textContent,
    author: authorName.textContent.replace("~", ""),
    date: new Date().toLocaleDateString(),
  };

  quoteArr.push(quote);

  localStorage.setItem("quoteArr", JSON.stringify(quoteArr));
  renderQuotes();
});

// renderQuotes function
function renderQuotes() {
  if (quoteArr.length > 0) {
    preSkeleton.textContent = "";
  }
  quoteLi.innerHTML = "";

  quoteArr.forEach(function (list) {
    // decalre
    let quoteText = document.createElement("li");
    let authorText = document.createElement("li");
    let datetext = document.createElement("li");

    // content addition
    quoteText.textContent = list.quote;
    authorText.textContent = list.author;
    datetext.textContent = list.date;

    // appending element
    quoteLi.appendChild(quoteText);
    quoteLi.appendChild(authorText);
    quoteLi.appendChild(datetext);
  });
}

renderQuotes();

// save quote to local storage button
generateThoughtBtn.addEventListener("click", generateThoughtHandler);
