/**
 * Returns the queried word of the day
 * @returns @type {string}
 */
export default async function getWordOfTheDay(){
  //Hit endpoint here
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
  const request = await fetch (`${baseUrl}/Game/GetChallenge`);
  const data = await request.json()
  console.log(data.word)
  return data.word;
}