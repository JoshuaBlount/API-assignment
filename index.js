'use strict'

// step 1 create function and event listener for user input to be able to search the github API for user's repos(call has to get a hit from the GitHub API maybe add console.log response to make sure it is recieved)
// step 2 Once the username that is input is called have promises set up to make sure the user is connected to the internet and they did not recieve any error codes
// step 3 if the username is valid append the resulting searched user's repo's along with the proper repo name and link inside the DOM.
// step 4 the user should be able to make multiple searches so make sure to use a .empty() to clear out the previous searches once a new search is made

function displayResults(responseJson) {
  // remove previous searches
  console.log(responseJson)
  $('#results-list').empty();

  //creates a for loop to go through each repo for the user to ensure it pulls all of them.
  for (let i=0; i<responseJson.length; i++) {
    // appends the proper username, repo's and links to each to the DOM
    $('#results-list').append(`
    <li><a href='${responseJson[i].html_url}'>
    ${responseJson[i].name}</a>
    </li>
    <h3>${responseJson[i].owner.login}</h3>
    `)
  
  $('#results').removeClass('hidden')
}

function fetchRepos(userName) {
  fetch('https://api.github.com/users/'+userName+'/repos')
  // creates new promise to test for basic 404 and other HTML status errors
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText)
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => console.log(`an error has occured because ${err.message}`));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('input').val();
    fetchRepos(userName);
  })
}

$(watchForm);
