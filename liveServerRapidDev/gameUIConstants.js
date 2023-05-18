/**
 * object containing all UI State change information
 */
const UIConstants = {
  /**
   * @type {[]string[]}
   */
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
    ['--backButtonBC', '#95CACA'],
    ['--timerFontColor', '#343434'],
    ['--emptyInputBGColor', '#C4CED8'],
    ['--defaultButtonBGColor', '#C4CED8'],
    ['--enterBackgroundDisabled','#648080']
  ],
  darkColorPallet:[
    ['--bigBackground', '#0C1818'],
    ['--buttonFontColor','white'],
    ['--completeCorrect', '#53e485'],
    ['--semiCorrect', '#efde45'],
    ['--wrong', '#343434'],
    ['--wrongFontColor','#90959F'],
    ['--enterBackground','#639999'],
    ['--defaultFont','white'],
    ['--svgColor', 'white' ],
    ['--enterBackground','#639999'],
    ['--timerFontColor', '#639999'],
    ['--emptyInputBGColor', '#6B7378'],
    ['--defaultButtonBGColor', '#90959F'],
    ['--enterBackgroundDisabled','#648080']

  ],
  icons:{
    themeIcon:{
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    backspaceIcon:{
      iconVar: '--backspaceIcon',
      lightMode: 'url("backspaceIconLightMode.svg")',
      darkMode: ''
    }
  },
  logo:{
    logoVar: '--wordleLogo',
    lightMode: 'url(wordleLogoLightMode.svg)',
    darkMode: 'url(wordleLogoDarkMode.svg)',
  },
  keyboardLayout:[
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ],
  enterButton:{
    backgroundVar: '--enterBackground',
    lightmode:{
      enable: '#639999',
      disabled: '#648080',
    },
    darkmode:{
      enable: '#639999',
      disabled: '#648080',
    }
  },
  gridDisplayItemState:{
    completelyCorrect: 'completelyCorrect',
    semiCorrect: 'correctLetterWrongPlace',
    wrong: 'completelyWrong'
  },
  gridSize:{
    varName: '--gridSize',
    value: 5
  },
  gridSelectedClass:{
    className:'currentlySelected',
    lightModeValue: 0.6,
    darkModeValue:1.6,
    varName: '--brightnessValue'
  },
};

/**
 * List of component IDs on the game page
 */
const UIIDList ={
  gameColorPallet: 'GameColorPallet',
  timeCount: 'timeCount',
  colorToggle: 'colorToggle',
  logo: 'logo',
  displayBoard: 'displayBoard',
  keyboardContainer: 'keyboardContainer',
  mainEnterButton: 'enterButton',
  buttonBackSpace: 'buttonBackSpace',
};

export {UIConstants, UIIDList};
