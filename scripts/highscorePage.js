const scoreBoard = document.getElementById('scoreBoard');
const backButton = document.getElementById('backButton');
const UserScoreRow = document.getElementById('userRow');
const baseUrl = window.location.href.split('/').slice(0, 3).join('/');

const getScore =  async () => {
  console.log(baseUrl);
  let counter = 0;
  let data = await fetch(baseUrl + '/' + 'Highscore' + '/' + 'scores');
  data = await data.json();
  data = data.highscore;
  data.sort((a, b) => b.score - a.score);
  data.map(x=>{
    const newListRow= document.createElement('tr');
    const newRankItem = document.createElement('td');
    const newNameItem = document.createElement('td');
    const newTimeItem = document.createElement('td');
    counter++;
    //newListItem.textContent = x.user_email + ' - ' + x.score
    newRankItem.textContent = counter.toString();
    newNameItem.textContent = x.user_email ;
    newTimeItem.textContent = 'Time value'; //change to time attribute later
    newListRow.appendChild(newRankItem);
    newListRow.appendChild(newNameItem);
    newListRow.appendChild(newTimeItem);
    scoreBoard.appendChild(newListRow);
  });


};

getScore();

//backButton.onclick = function() {
//  console.log("we in here");
//    window.location.href = baseUrl + "/Game";
// };

