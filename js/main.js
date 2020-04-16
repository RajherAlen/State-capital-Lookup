const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const data = await res.json();

  // Get matches to current text input
  let matches = data.filter(data => {
    const regex = new RegExp(`^${searchText}`, "gi"); // ^ starting // gi global, matches if its lower or uppercase
    return data.name.match(regex);
  });

  // If input is empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
            <div class="card card-body mb-1"> 
                <h4>${match.name} (${match.country_code}) <span class="text text-success"> ${match.capital}</span> </h4>
                
            </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

// addEventListener INPUT is when a user writes something in an
search.addEventListener("input", () => searchStates(search.value));
