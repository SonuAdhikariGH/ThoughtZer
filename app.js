const thoughtMain = document.querySelector("#thoughtMain");
const authorName = document.querySelector("#authorName");
const generateThoughtBtn = document.querySelector("#generateThoughtBtn");

// btn event handler
async function generateThoughtHandler(e) {
  e.preventDefault();

  thoughtMain.textContent = "Loading..";
  authorName.textContent = "";

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    thoughtMain.textContent = data.quote;
    authorName.textContent = `~${data.author}`;
    generateThoughtBtn.innerHTML = `Refresh`;
  } catch {
    thoughtMain.textContent(`404 Error`);
    throw new console.error(`Server Didn't Respond, Please Try Again`);
  }
}

generateThoughtBtn.addEventListener("click", generateThoughtHandler);
