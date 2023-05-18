import { UIConstants } from './gameUIConstants.js';

const baseUrl = window.location.href.split('/').slice(0, 3).join('/');

/**
 * Returns the queried word of the day
 * @returns @type {string}
 */

export async function getWordOfTheDay() {
  if (UIConstants.APILocalMode)
    return 'Plant';

  const request = await fetch(`${baseUrl}/Game/GetChallenge`);
  const data = await request.json();
  console.log(data.word);
  return data.word;
}

/**
 * posts user data to backend Very securely :->
 * @param {string} time
 * @returns
 */
export async function postUserData(time) {

  if (UIConstants.APILocalMode) {
    location.href = `${baseUrl}/Highscore`;
    console.log('This is suppose to post the user data');
    return true;
  }

  await fetch(`${baseUrl}/Game/SaveGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Add any other required headers
    },
    body: JSON.stringify({
      duration: (time.length > 5) ? '99:99:99' : `00:${time}`
    }) // Replace 'data' with your actual request payload
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data);
      location.href = `${baseUrl}/Highscore`;

    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


export async function getHighScore(){
  if (UIConstants.APILocalMode)
    return [
      '10:00',
      '15:00',
      '25:00',
      '05:00',
      '02:00',
      '69:00'
    ].sort();

  console.log(baseUrl);
  let data = await fetch(`${baseUrl}/Highscore/scores`);
  data = await data.json();
  data = data.highscore;
  data.sort();
  return data;
}

