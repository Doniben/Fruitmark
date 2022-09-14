import { Platform } from 'react-native'


let baseURL = '';

{ Platform.OS == 'android'
  ? baseURL = 'https://fruitmark-production.up.railway.app/api/v1/'
  : baseURL = 'https://fruitmark.vercel.app/api/v1/'
}

export default baseURL;