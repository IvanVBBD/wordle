import { UIConstants } from './gameUIConstants.js';

/**
 * posts user data to backend Very securely :->
 * @param {string} time
 * @returns
 */
export default async function postUserData(time){
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/');

  if (UIConstants.APILocalMode)
  {
    location.href = `${baseUrl}/Highscore`;
    return true;
  }

  await fetch(`${baseUrl}/Game/SaveGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    // Add any other required headers
    },
    body: JSON.stringify({
      duration:(time.length > 5)?'99:99:99':`00:${time}`
    }) // Replace 'data' with your actual request payload
  })
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url; // Redirect to the response URL
      } else {
      // Handle the response data
        return response.json();
      }
    })
    .then(data => {
    // Process the response data if not redirected
      console.log(data);
    })
    .catch(error => {
    // Handle any errors
      console.error(error);
    });
}
