import { getHighScore, getWordOfTheDay } from './API.js';
import { getRandomAnimalNames } from './randomAnimalNames.js';

const boxes = document.getElementById('correctWordDisplay');
const scoreBoard = document.getElementById('scoreBoard');
const timeDisplay = document.querySelector('.time p');

const tableRowHeaders = `
			<tr>
				<th id="rankColumn">Rank</th>
				<th id="nameColumn">Name</th>

				<th id="timeColumn">
					<img src="./timeIcon.svg" alt="Timer">
					Time
				</th>
			</tr>`;

const displayData = await getHighScore();

const makeTwo= (value)=>{
  return ( `${value}`.length >= 2)? `${value}` : `0${value}`;
};

console.log(displayData);

const userNames = getRandomAnimalNames(5);
const correctWord = (await getWordOfTheDay()).toUpperCase();

boxes.innerHTML = correctWord.split('').map((char)=>{
  return `
  <p class="green-box">${char}</p>
  `;
}).join('');

let innerHTML = '';
for (let i = 0; i < Math.min(displayData.highScores.length,5)   ;i++){
  const time = new Date(displayData.highScores[i].duration);
  innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${(displayData.highScores[i].user_id === displayData.userScore.user_id)?'You':userNames[i]}</td>
      <td>${makeTwo(time.getMinutes())}:${makeTwo(time.getSeconds())}</td>
    </tr>
  `;
}

let time = new Date(displayData.userScore.duration);

innerHTML +=`
<tr id="userRow">
  <td>${displayData.userRank.UserAbove+1}</td>
  <td>You</td>
  <td>${makeTwo(time.getMinutes())}:${makeTwo(time.getSeconds())}</td>
</tr>
`;
scoreBoard.innerHTML = `${tableRowHeaders}${innerHTML}`;

time = new Date(displayData.userScore.duration);

timeDisplay.innerHTML = `${makeTwo(time.getMinutes())}:${makeTwo(time.getSeconds())}`;