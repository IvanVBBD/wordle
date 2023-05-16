/**
 * Returns the queried word of the day
 * @returns @type {string}
 */
export default async function getWordOfTheDay(){
  //Hit endpoint here
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
  const word = await fetch(`${baseUrl}/GetChallenge`);
  return 'Plant';
}