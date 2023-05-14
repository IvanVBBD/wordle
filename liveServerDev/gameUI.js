import UIStateManager from './UIStateManager.js';
import * as UIHelpers from './UIHelpers.js';
import UIConstants from './gameUIConstants.js';

const compDataState = {
  colorStateLight:true,
  soundOn: false
};

function updateColorPalletFromState(ColorPallet){
  let rootVars = document.querySelector(':root');
  ColorPallet.forEach(colorPair => {
    rootVars.style.setProperty(colorPair[0],colorPair[1]);
  });
}

const gameUIManager = new UIStateManager();

const gameColorPallet = 'GameColorPallet';
gameUIManager.addUIState(gameColorPallet,UIConstants.lightColorPallet);
gameUIManager.addListenerToUIUpdate(gameColorPallet,updateColorPalletFromState );

function onThemeSwitchClick(){
  compDataState.colorStateLight = !compDataState.colorStateLight;
  const colorPallet = (compDataState.colorStateLight)? UIConstants.lightColorPallet: UIConstants.darkColorPallet;

  gameUIManager.updateUIState(gameColorPallet,colorPallet);
}

const UIEventTree = {};

const DOBList = [
  new UIHelpers.DOD('colorToggle', undefined, 'click',onThemeSwitchClick),
];

export function activateUI(){
  UIHelpers.locateAndMount(UIEventTree,DOBList);
}