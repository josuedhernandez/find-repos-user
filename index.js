const searchURL = "https://api.github.com/users/";

function formatQueryParams(user) {
  return user + "/repos";
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  $("#results-list").empty();
  // iterate through the articles array, stopping at the max number of results
  responseJson.map((repo) => {
    // Display and append results.
    $("#results-list").append(
      `<li><h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>Repo Name: ${repo.name}</p>
      <p>URL: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
        </li>`
    );
  });
  //display the results section
  $("#results").removeClass("hidden");
}

function getRepos(username) {
  const queryString = formatQueryParams(username);
  const url = searchURL + queryString;
  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    console.log(searchTerm);
    getRepos(searchTerm);
  });
}

$(watchForm);
