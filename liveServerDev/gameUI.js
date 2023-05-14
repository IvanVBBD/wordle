import * as UIHelpers from './UIHelpers.js'

const UI = {};

const DOBList = [
  new UIHelpers.DOD("colorToggle", undefined, "click",colorToggleClick),
]

const compState = {
  colorStateLight:true,
  soundOn: false
}

const UIState = {
  
  lightColorPallet:[
    ['--bigBackground', '#F2F8F8'],
    ['--buttonFontColor','white'],
    ['--completeCorrect', '#53e485'],
    ['--semiCorrect', '#efde45'],
    ['--wrong', '#6b7378'],
    ['--wrongFontColor','#C4CED8'],
    ['--enterBackground','#639999'],
    ['--defaultFont','#343434'],
    ['--svgColor', 'black' ],
    ['--backButtonBC', '#95CACA']
  ],
  darkColorPallet:[
    ['--bigBackground', '#0C1818'],
    ['--buttonFontColor','black'],
    ['--completeCorrect', 'black'],
    ['--semiCorrect', 'black'],
    ['--wrong', 'black'],
    ['--wrongFontColor','black'],
    ['--enterBackground','black'],
    ['--defaultFont','black'],
    ['--svgColor', 'white' ],
    ['--backButtonBC', '#95CACA']
  ],
  icons:{
    themeIcon:{
      iconVar: "--colorToggleSVG",
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    soundOnIcon:{
      iconVar: "--colorToggleSVG",
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    soundOffIcon:{
      iconVar: "--colorToggleSVG",
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    }
  },
};

function colorToggleClick(){
  compState.colorStateLight = !compState.colorStateLight;
  let rootVars = document.querySelector(':root');
  const ColorPallet = (compState.colorStateLight)? UIState.lightColorPallet: UIState.darkColorPallet;
  ColorPallet.forEach(colorPair => {
    rootVars.style.setProperty(colorPair[0],colorPair[1]);
  });

  rootVars.style.setProperty(UIState.icons.themeIcon.iconVar,(compState.colorStateLight)?UIState.icons.themeIcon.lightMode:UIState.icons.themeIcon.darkMode);
  // rootVars.style.setProperty( UIState.soundOnIcon.iconVar,
  //   (compState.colorStateLight)?
  //     (UIState.):UIState.icons.themeIcon.darkMode
  // );
}

export function activateUI(){
  UIHelpers.locateAndMount(UI,DOBList);
}

export function alertMe(){
  alert("Gamers")
}