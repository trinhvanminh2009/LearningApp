import { APP_CONFIG, } from '@src/constants'
import R from 'ramda'

export const delay = (ms) => (
  new Promise((resolve, reject) => (
    setTimeout(resolve, ms))
  )
)

export const classifyMMSType = (key) => {
  if (R.includes(key, '.png.jpg.jpeg.gif.bmp')) {
    return APP_CONFIG.typeOfMMS.image
  } else if (R.includes(key, '.mp4')) {
    return APP_CONFIG.typeOfMMS.video
  } else if (R.includes(key, '.mp3.ogg.amr')) {
    return APP_CONFIG.typeOfMMS.audio
  }
}
