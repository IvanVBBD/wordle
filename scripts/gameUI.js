import UIStateManager from './UIStateManager.js';
import * as UIHelpers from './UIHelpers.js';
import { UIConstants,UIIDList } from './gameUIConstants.js';
import genKeyboard from './keyboardGenerator.js';
import generateInputGrid from './generateInputGrid.js';
import { LetterNode } from './generateInputGrid.js';
import getWordOfTheDay from './getWordOfTheDay.js';
import words from './validWords.js';
import postUserData from './uploadUserScore.js';

const compDataState = { //Game data state being display and what is used for logic
  colorStateLight:true,
  soundOn: false,
  startTime: new Date(),
  activeGridInput: 0,
  canUseEnter: false,
  currentTime: null
};

/**
 * updates the css root variables with the corresponding color value
 * @param {*} ColorPallet theme passed in
 */
function updateColorPalletFromState(ColorPallet){
  let rootVars = document.querySelector(':root');
  ColorPallet.forEach(colorPair => {
    rootVars.style.setProperty(colorPair[0],colorPair[1]);
  });
}

/**
 * Updates the logo
 * @param {*} LogoURL the url to the logo to display
 */
function updateLogo(LogoURL){
  let rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.logo.logoVar,LogoURL);
}

function updateThemeIcon(ThemeIconURL){
  let rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.icons.themeIcon.iconVar,ThemeIconURL);
}

//Create UIStateManager instance for this page
const gameUIManager = new UIStateManager();

// Register the game color pallet (theme) UI state with lightmode being the initial mode
gameUIManager.addUIState(UIIDList.gameColorPallet,UIConstants.lightColorPallet);
gameUIManager.addListenerToUIUpdate(UIIDList.gameColorPallet,updateColorPalletFromState );

// Figure it out your smart enough
gameUIManager.addUIState(UIIDList.logo,UIConstants.logo.lightMode);
gameUIManager.addListenerToUIUpdate(UIIDList.logo,updateLogo );

// Figure it out your smart enough
gameUIManager.addUIState(UIIDList.colorToggle,UIConstants.logo.lightMode);
gameUIManager.addListenerToUIUpdate(UIIDList.colorToggle,updateThemeIcon );


console.log(JSON.stringify(gameUIManager.UIState) );
console.log( JSON.stringify(gameUIManager.pubSub.publishedEvents) );
// Method which is triggered on the onclick event of the theme icon click
function onThemeSwitchClick(){
  // Updating the logical state of the theme
  compDataState.colorStateLight = !compDataState.colorStateLight;

  // Getting the corresponding color pallet and calling the uiManager updateState method to run all subscribed methods with the new state
  const colorPallet = (compDataState.colorStateLight)? UIConstants.lightColorPallet: UIConstants.darkColorPallet;
  gameUIManager.updateUIState(UIIDList.gameColorPallet,colorPallet);

  const logoURL = (compDataState.colorStateLight)? UIConstants.logo.lightMode: UIConstants.logo.darkMode;
  gameUIManager.updateUIState(UIIDList.logo,logoURL);

  const themeIcon = (compDataState.colorStateLight)? UIConstants.icons.themeIcon.lightMode: UIConstants.icons.themeIcon.darkMode;
  gameUIManager.updateUIState(UIIDList.colorToggle,themeIcon);
}

// Utility method to calculate and update the timer UI Component
function calculateGameTimePass(){
  const makeTwo = (value) => {
    if (`${value}`.length < 2)
      return `0${value}`;
    return `${value}`;
  };

  const currentTime = new Date(Math.abs(new Date() - compDataState.startTime))  ;
  const time = `${makeTwo(currentTime.getMinutes())}:${makeTwo(currentTime.getSeconds()) }` ;
  compDataState.currentTime = time;
  UITree[UIIDList.timeCount].innerText = time;
}

//Object used to store all used components which have methods subscribed to events on them
const UITree = {};

/** @type {number} */
/**
 * convertes between an index and a coordinate
 * @returns
 */
function gridIndexToCord(){
  // Yes its X;Y;
  return [compDataState.activeGridInput % UIConstants.gridSize, Math.floor(compDataState.activeGridInput / UIConstants.gridSize)];
}

function bumpGridIndex(enterClick){
  
  if (enterClick)
  {
    compDataState.activeGridInput++;
    return;
  }

  if (compDataState.activeGridInput == 0)
  {
    compDataState.activeGridInput++;
    return;
  }

  if ((compDataState.activeGridInput+1) % UIConstants.gridSize)
  {
    compDataState.activeGridInput++;
    return;
  }
}

function isValidWord(userWord){
  return words.includes(userWord.toLowerCase());
}

/**
 * Gets the last row of input that is displayed
 * @returns @type {string} The combined characters in the last row.
 */
function getInputString(){

  const loc = gridIndexToCord();
  let strOut = '';
  for (let i= 0; i < UIConstants.gridSize;i++){
    strOut += gameUIManager.getUIState(`R${loc[1]}C${i}`)?.letterValue;
  }
  return strOut;
}

/**
 * Unbumps the 
 * @returns 
 */
function unBumpIndex(){
  if (compDataState.activeGridInput <= 0)
    return;
  if ((compDataState.activeGridInput) % UIConstants.gridSize)
    compDataState.activeGridInput--;
}

/**
 * Checks the user input agains the received value and updating the GUI
 * @param {string} userWord 
 * @param {string} gottenWord 
 * @param {number} row 
 */
function checkEnteredValue(gottenWord,row){
  let allCharCorrect = true;
  for (let i = 0; i < UIConstants.gridSize; i++){
    const UIID = `R${row}C${i}`;
    /** @type { LetterNode } */
    const currentUIState = gameUIManager.getUIState(UIID);

    if (currentUIState.letterValue == gottenWord.charAt(i))
      currentUIState.colorState = UIConstants.gridDisplayItemState.completelyCorrect;
    else if (gottenWord.indexOf(currentUIState.letterValue)>=0)
    {
      currentUIState.colorState = UIConstants.gridDisplayItemState.semiCorrect;
      allCharCorrect = false;
    }
    else
    {
      currentUIState.colorState = UIConstants.gridDisplayItemState.wrong;
      allCharCorrect = false;
    }
    
    gameUIManager.updateUIState(UIID,currentUIState);
  }
  return allCharCorrect;
}

async function enterClick(){
  if (!compDataState.canUseEnter)
    return;
  const correctWord = (await getWordOfTheDay()).toUpperCase();
  const loc = gridIndexToCord();
  const wasCorrect = checkEnteredValue(correctWord,loc[1]);
  console.log(wasCorrect);
  if (!wasCorrect)
    bumpGridIndex(true);
  else{
    alert('');
    
    await postUserData(compDataState.currentTime);
    alert('');
  }
}

function updateButtonBackground(newBackgroundColor){
  alert('Nice');
}

gameUIManager.addUIState(UIIDList.mainEnterButton,false);
gameUIManager.addListenerToUIUpdate(UIIDList.mainEnterButton,updateButtonBackground);

/**
 * Loads DOM elements with corresponding events and methods into the UITree;
 */
export function activateUI(){
  //Adds finds and adds methods as subscribers to the given domElement
  const reactiveComponentList = [
    new UIHelpers.DOD(UIIDList.colorToggle, undefined, 'click',onThemeSwitchClick),
    new UIHelpers.DOD(UIIDList.mainEnterButton, undefined, 'click',enterClick),
  ];
  UIHelpers.locateAndMount(UITree,reactiveComponentList);

  //Finds and adds DOM element to UITree, not there is not events listening.
  const liveComponentList = [
    new UIHelpers.DOD(UIIDList.timeCount),
    new UIHelpers.DOD(UIIDList.keyboardContainer),
  ];

  UIHelpers.locateUI(UITree,liveComponentList);

  calculateGameTimePass();
  //Time ticks lol
  setInterval(calculateGameTimePass,1000);

  console.log(gameUIManager.pubSub.publishedEvents);

  genKeyboard(UITree.keyboardContainer,(x)=>{

    /** @type {number[]} */
    const locate =gridIndexToCord();

    /** @type {string} */
    const accessUIID = `R${locate[1]}C${locate[0]}`;

    /** @type { LetterNode }*/
    const currentState = gameUIManager.getUIState(accessUIID);
    currentState.letterValue = x;

    gameUIManager.updateUIState(accessUIID, currentState);
    bumpGridIndex(false);

    compDataState.canUseEnter = isValidWord(getInputString());
    console.log(compDataState.canUseEnter);
    gameUIManager.updateUIState('Temp',(compDataState.canUseEnter));
  },UITree,()=>{
    const locate =gridIndexToCord();

    /** @type {string} */
    const accessUIID = `R${locate[1]}C${locate[0]}`;

    const currentState = gameUIManager.getUIState(accessUIID);
    currentState.letterValue = '';

    gameUIManager.updateUIState(accessUIID, currentState);
    
    unBumpIndex();
  });

  UIHelpers.locateUI(UITree,[new UIHelpers.DOD(UIIDList.displayBoard)]);
  generateInputGrid(UITree,gameUIManager,UITree[UIIDList.displayBoard]);
}