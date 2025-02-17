// App Fonts
export const FONT1REGULAR = 'Roboto-Regular';
export const FONT1BOLD = 'Roboto-Bold';
export const FONT1MEDIUM = 'Roboto-Medium';
export const FONT1BOLDITALIC = 'Roboto-Italic';
export const FONT2REGULAR = 'Inter-Regular';
export const FONT2BOLD = 'Inter-Bold';
export const FONT2MEDIUM = 'Inter-Medium';
export const FONT2LIGHT = 'Inter-Light';
export const FONT2THIN = 'Inter-Thin';
export const FONT2SEMIBOLD = 'Inter-SemiBold';

// App Colors
export const COLORS = {
  primary: '#D70404',
  drawer: 'rgba(215, 4, 4, 0.7)',
  secondary: '#16A5EF',
  messageRight: '#D8D8D8',
  headerBG: '#F5F5F5',
  white: 'white',
  white06: '#FFFFFF99',
  ratingColor: 'rgba(35, 31, 32, 0.3)',
  lightergrey: '#FBFBFD',
  lightblue: 'rgba(57, 189, 183, 0.1)',
  grey: '#ABB3BB',
  grey1: '#1C1A19',
  grey2: '#505050',
  gray3: '#979797',
  grey4: '#F4F4F4',
  darkGrey: '#6B6B6B',
  darkBlack: '#000',
  green: 'green',
  pay: '#12D790',
  yellow: 'yellow',
  red: 'red',
  lightgrey: '#F6F6F6',
  black: '#231F20',
  greyButton: '#474951',
  inputPrefixBG: '#E4F4EE',
  imageBG: '#22242E',
  imageBGBorder: '#30313A',
  imageText: '#BABABD',
  alertButon: '#FF3434',
  borderColor: '#E8E8E8',
  success: '#83D333',
  heartBG: 'rgba(255,255,255,0.6)',
  drawerBottomWidth: '#33333308',
  settingsIconBG: 'rgba(51, 51, 51, 0.03)',
  primary1: '#FFEEEE',
  white1: '#F4F4F4',
};

// MAPS
export const GOOGLE_API_KEY = 'AIzaSyCvKP9iZ6fpXwTiokStkPe8H0XSUD12DbU';

export const mapStyle = [
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const times = [
  {
    key: '30 minutes',
    value: 30,
  },
  {
    key: '1 hour',
    value: 60,
  },
  {
    key: '1.5 hour',
    value: 90,
  },
  {
    key: '2 hour',
    value: 120,
  },
  {
    key: '2.5 hour',
    value: 150,
  },
  {
    key: '3 hour',
    value: 180,
  },
  {
    key: '3.5 hour',
    value: 210,
  },
  {
    key: '4 hour',
    value: 240,
  },
  {
    key: '4.5 hour',
    value: 270,
  },
  {
    key: '5 hour',
    value: 300,
  },
];

export const difficulty_level = [
  {label: 'Easy', value: 'Easy'},
  {label: 'Medium', value: 'Medium'},
  {label: 'Hard', value: 'Hard'},
];

// Hour Options
export const hourOptions = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},
  {label: '18', value: 18},
  {label: '24', value: 24},
  {label: '48', value: 48},
  {label: '48+', value: '48+'},
];

// Minute Options
export const minuteOptions = [
  {label: '00', value: 0},
  {label: '05', value: 5},
  {label: '10', value: 10},
  {label: '15', value: 15},
  {label: '20', value: 20},
  {label: '25', value: 25},
  {label: '30', value: 30},
  {label: '35', value: 35},
  {label: '40', value: 40},
  {label: '45', value: 45},
  {label: '50', value: 50},
  {label: '55', value: 55},
];
