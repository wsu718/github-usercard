/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/



//   })
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'taterntots',
  'spencer-mcguire',
  'jevoncochran',
  'AnthonyLopez1120',
  'jsulinski'
];



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitCard(obj){
  const newCard = document.createElement('div');
  
  const newImage = document.createElement('img');
  const newInfo = document.createElement('div');

    const newName = document.createElement('h3');
    const newUserName = document.createElement('p');
    const newLocation = document.createElement('p');
    const newProfile = document.createElement('p');
      const newLink = document.createElement('a');
    const newFollowers = document.createElement('p');
    const newFollowing = document.createElement('p');
    const newBio = document.createElement('p');
    const newNewLink = document.createElement('a');

newImage.src = obj.data.avatar_url;
newName.textContent = obj.data.name;
newUserName.textContent = obj.data.login;
newLocation.textContent = 'Location: ' + obj.data.location;
newProfile.textContent = 'Profile: '
newLink.textContent = obj.data.html_url;
newLink.href = obj.data.html_url;
newFollowers.textContent = 'Followers: ' + obj.data.followers;
newFollowing.textContent = 'Following: ' + obj.data.following;
newBio.textContent = 'Bio: ' + obj.data.bio;

newCard.classList.add('card');
newInfo.classList.add('card-info');
newName.classList.add('name');
newUserName.classList.add('username');

newCard.appendChild(newImage);
newCard.appendChild(newInfo);

newInfo.appendChild(newName);
newInfo.appendChild(newUserName);
newInfo.appendChild(newLocation);
newInfo.appendChild(newProfile);
  newProfile.appendChild(newLink);
newInfo.appendChild(newFollowers);
newInfo.appendChild(newFollowing);
newInfo.appendChild(newBio);

return newCard;

}

const entryPoint = document.querySelector(".cards");

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.get("https://api.github.com/users/wsu718")
  .then(response => {
    console.log(response)
    // console.log(response.data.name);
    const newGit = gitCard(response);
      entryPoint.appendChild(newGit);
    })
    .catch(error => {
      console.log("The data was not returned", error)
    });

//create cards for follwersArray
followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`)
  .then(response => {
    // console.log(response)
    // console.log(response.data.name);
    const newGit = gitCard(response);
      entryPoint.appendChild(newGit);
    })
    .catch(error => {
      console.log("The data was not returned", error)
    });
})
 
//stretch goal: create cards programatically  
axios.get("https://api.github.com/users/wsu718/followers")
  .then(response => {
    response.data.forEach(item => {
      // console.log(item);
      axios.get(`https://api.github.com/users/${item.login}`)
      .then(response => {
        const newGit = gitCard(response);
        entryPoint.appendChild(newGit);  
    })
  })
});
    // console.log(response);
    // // 
    // // .then(resp => {
    // //   resp.data.forEach(item => {
    // //     
    // // })
    // // })
    // });