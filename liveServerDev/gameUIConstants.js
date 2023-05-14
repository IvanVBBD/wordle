/**
 * object containing all UI State change information
 */
const UIConstants = {
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
    ['--emptyInputBGColor', '#C4CED8']
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
    ['--backButtonBC', '#95CACA'],
    ['--timerFontColor', '#639999'],
    ['--emptyInputBGColor', '#6B7378']

  ],
  icons:{
    themeIcon:{
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    }
  },
  logo:{
    logoVar: '--wordleLogo',
    lightMode: 'url(wordleLogoLightMode.svg)',
    darkMode: 'url(wordleLogoDarkMode.svg)',
  }
};

/**
 * List of component IDs on the game page
 */
const UIIDList ={
  gameColorPallet: 'GameColorPallet',
  timeCount: 'timeCount',
  colorToggle: 'colorToggle',
  logo: 'logo'
};

export {UIConstants, UIIDList};