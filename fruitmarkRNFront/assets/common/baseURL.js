import { Platform } from 'react-native'


let baseURL = '';

{ Platform.OS == 'android'
  ? baseURL = 'https://fruitmark.vercel.app/api/v1/'
  : baseURL = 'https://fruitmark-production.up.railway.app/'
}
// https://fruitmark-production.up.railway.app/
// http://192.168.1.132:5100/api/v1/
// https://fruitmark.vercel.app/api/v1/
export default baseURL;