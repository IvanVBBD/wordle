export default async function postUserData(time){
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
  await fetch(`${baseUrl}/Game/SaveGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    // Add any other required headers
    },
    body: JSON.stringify({
      duration:time
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