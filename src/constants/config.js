export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = '/app/piaf/start'
export const searchPath = '/app/search'
export const buyUrl = 'https://1.envato.market/nEyZa'

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'en'
export const defaultDirection = 'ltr'
export const localeOptions = [
  { id: 'en', name: 'English LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English RTL', direction: 'rtl' }
]

export const firebaseConfig = {
  apiKey: "AIzaSyDe94G7L-3soXVSpVbsYlB5DfYH2L91aTU",
  authDomain: "piaf-vue-login.firebaseapp.com",
  databaseURL: "https://piaf-vue-login.firebaseio.com",
  projectId: "piaf-vue-login",
  storageBucket: "piaf-vue-login.appspot.com",
  messagingSenderId: "557576321564",
  appId: "1:557576321564:web:bc2ce73477aff5c2197dd9"
};

//Local api
export const apiUrl = 'http://localhost:8000/api'
//remote api
// export const apiUrl = 'https://scvr.aqtdemos.com/public/api'

export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profile-pic-l.jpg',
  date: 'Last seen today 15:24'
}

export const isAuthActive = true
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.blueolympic'

export const colors = ['bluenavy',  'blueyale',  'blueolympic',  'greenmoss',  'greenlime',  'purplemonster',  'orangecarrot',  'redruby',  'yellowgranola',  'greysteel']
