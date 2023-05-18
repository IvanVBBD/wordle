export default async function postUserData(time){
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
  await fetch(`${baseUrl}/Game/SaveGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    // Add any other required headers
    },
    body: JSON.stringify({
      duration:`00:${time}`
    }) // Replace 'data' with your actual request payload
  })
    .then(response => response.json())
    .then(data => {
    // Handle the response data
      console.log(data);
      window.location(`${baseUrl}/Highscore`);
    })
    .catch(error => {
    // Handle any errors
      console.error(error);
    });
}
