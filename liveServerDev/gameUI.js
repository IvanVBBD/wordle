import UIStateManager from './UIStateManager.js';
import * as UIHelpers from './UIHelpers.js';
import { UIConstants,UIIDList } from './gameUIConstants.js';

const compDataState = { //Game data state being display and what is used for logic
  colorStateLight:true,
  soundOn: false,
  startTime: new Date()
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

//Create UIStateManager instance for this page
const gameUIManager = new UIStateManager();

// Register the game color pallet (theme) UI state with lightmode being the initial mode
gameUIManager.addUIState(UIIDList.gameColorPallet,UIConstants.lightColorPallet);
gameUIManager.addListenerToUIUpdate(UIIDList.gameColorPallet,updateColorPalletFromState );

// Figure it out your smart enough
gameUIManager.addUIState(UIIDList.logo,UIConstants.logo.lightMode);
gameUIManager.addListenerToUIUpdate(UIIDList.logo,updateLogo );

// Method which is triggered on the onclick event of the theme icon click
function onThemeSwitchClick(){
  // Updating the logical state of the theme
  compDataState.colorStateLight = !compDataState.colorStateLight;

  // Getting the corresponding color pallet and calling the uiManager updateState method to run all subscribed methods with the new state
  const colorPallet = (compDataState.colorStateLight)? UIConstants.lightColorPallet: UIConstants.darkColorPallet;
  gameUIManager.updateUIState(UIIDList.gameColorPallet,colorPallet);

  const logoURL = (compDataState.colorStateLight)? UIConstants.logo.lightMode: UIConstants.logo.darkMode;
  gameUIManager.updateUIState(UIIDList.logo,logoURL);
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
  UIEventTree[UIIDList.timeCount].innerText = time;  
}

//Object used to store all used components which have methods subscribed to events on them
const UIEventTree = {};

/**
 * Loads DOM elements with corresponding events and methods into the UIEventTree;
 */
export function activateUI(){
  //Adds finds and adds methods as subscribers to the given domElement
  const reactiveComponentList = [
    new UIHelpers.DOD(UIIDList.colorToggle, undefined, 'click',onThemeSwitchClick),
  ];
  UIHelpers.locateAndMount(UIEventTree,reactiveComponentList);

  //Finds and adds DOM element to UIEventTree, not there is not events listening.
  const liveComponentList = [
    new UIHelpers.DOD(UIIDList.timeCount),
  ];

  UIHelpers.locateUI(UIEventTree,liveComponentList);

  calculateGameTimePass();
  setInterval(calculateGameTimePass,1000);
}