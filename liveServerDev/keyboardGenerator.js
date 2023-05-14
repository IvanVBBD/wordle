import { UIConstants,UIIDList } from './gameUIConstants.js';
import * as UIHelpers from './UIHelpers.js';

export default function genKeyboard(targetLocation,alphaClicksMeth,UITree,backClickMeth){
  const backButHTML = `      
    <key-button id="${UIIDList.buttonBackSpace}" class="iconButton">
      
    </key-button>
  `;
  let HTMLKeys = '';
  let HTMLOut = '';
  const buttonIDs = [];
  let rowCount = 0;
  console.log(UIConstants.keyboardLayout);
  UIConstants.keyboardLayout.forEach(keyline => {
    HTMLKeys =keyline.split('').map((key)=>{
      buttonIDs.push(`button${key}`);
      return `
      <key-button id="button${key}">
        <p>${key}</p>
      </key-button>
    `;
    }).join('');
    HTMLOut += `<div class="keyRow">${HTMLKeys}${(rowCount >= 2)? backButHTML :'' }</div>`;
    rowCount++;
  });
  targetLocation.innerHTML = HTMLOut;

  const reactiveComponentList = buttonIDs.map( (id) =>{
    return new UIHelpers.DOD(id, undefined, 'click',() =>{
      console.log(id);
      alphaClicksMeth(id.substring(6));
    });
  });
  reactiveComponentList.push(new UIHelpers.DOD(UIIDList.buttonBackSpace, undefined, 'click' ,backClickMeth));
  UIHelpers.locateAndMount(UITree,reactiveComponentList);
}