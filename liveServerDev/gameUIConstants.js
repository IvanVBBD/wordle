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
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    soundOnIcon:{
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    soundOffIcon:{
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    }
  },
};

export default UIConstants;