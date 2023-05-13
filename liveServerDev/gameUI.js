import * as UIHelpers from './UIHelpers.js'

const UI = {};

const DOBList = [
  new UIHelpers.DOD("colorToggle", undefined, "click",colorToggleClick),
]

const UIState = {
  colorStateLight:true
};

function colorToggleClick(){
  UIState.colorStateLight = !UIState.colorStateLight;
  console.log(UIState.colorStateLight)
}

export function activateUI(){
  UIHelpers.locateAndMount(UI,DOBList);
}

export function alertMe(){
  alert("Gamers")
}