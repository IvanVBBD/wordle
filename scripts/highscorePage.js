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

const userTimes = await getHighScore();
const userNames = getRandomAnimalNames(5);
const correctWord = (await getWordOfTheDay()).toUpperCase();

console.log(userTimes);
console.log(correctWord);

boxes.innerHTML = correctWord.split('').map((char)=>{
  return `
  <p class="green-box">${char}</p>
  `;
}).join('');

let innerHTML = '';
for (let i = 0; i < 5;i++){
  innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${userNames[i]}</td>
      <td>${userTimes[i]}</td>
    </tr>
  `;
}
scoreBoard.innerHTML = `${tableRowHeaders}${innerHTML}`;
