import { addSeconds, format, } from 'date-fns'
import { APP_CONFIG, } from '@src/constants'
import moment from 'moment'
import R from 'ramda'

export const formatLCDTimeFromTimeInterval = (timeInterval) => {
  const HH = Math.floor(timeInterval / 3600)
  const mm = Math.floor((timeInterval - HH * 3600) / 60)
  const ss = Math.floor((timeInterval - HH * 3600 - mm * 60))

  const HHstr = HH < 10 ? `0${HH}`.slice(-2) : `${HH}`
  const mmstr = `0${mm}`.slice(-2)
  const ssstr = `0${ss}`.slice(-2)
  if (parseInt(HHstr) > 0) {
    return `${HHstr}:${mmstr}:${ssstr}`
  }
  return `${mmstr}:${ssstr}`
}

export const formatSecondToText = (totalSecond) => {
  const duration = moment.unix(totalSecond).utc().format('H[hr] m[min] s[s]')
  const durationArray = duration.split(' ')
  const hours = parseInt(durationArray[0].match(/\d+/))
  const minutes = parseInt(durationArray[1].match(/\d+/))
  if (hours > 0) {
    return duration
  } else if (minutes > 0) {
    return durationArray[1] + ' ' + durationArray[2]
  } else {
    return durationArray[2]
  }
}

export function formattedTime (seconds) {
  const helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'mm:ss')
}

export const rangeTime = (range) => {
  const x = range || 30 // minutes interval
  const times = [] // time array
  let tt = 0 // start time
  const ap = [ 'AM', 'PM', ] // AM-PM

  // loop to increment the time and push results in array
  for (let i = 0; tt < 24 * 60; i++) {
    const hh = Math.floor(tt / 60) // getting hours of day in 0-24 format
    const mm = (tt % 60) // getting minutes of the hour in 0-55 format
    times[i] = ('0' + ((hh === 0 || hh === 12) ? 12 : hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) + ' ' + ap[Math.floor(hh / 12)]
    tt = tt + x
  }

  return times
}

export const concatDateTime = (dueDate, time) => {
  // dueDate example 2019-9-20 and time example 11:09 AM
  const arrDates = R.split('-', dueDate)
  const arrTimes = R.split(':', R.split(' ', time)[0])
  const isPM = time.includes('PM')
  if (isPM) {
    return new Date(arrDates[0], arrDates[1] - 1, arrDates[2], parseInt(arrTimes[0], 10) === 12 ? arrTimes[0] : parseInt(arrTimes[0], 10) + 12, arrTimes[1])
  } else {
    return new Date(arrDates[0], arrDates[1] - 1, arrDates[2], parseInt(arrTimes[0], 10) === 12 ? 0 : arrTimes[0], arrTimes[1])
  }
}

export const formartDateTime = {
  sameDay: 'hh:mm A',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: 'dddd',
  sameElse: 'MMM DD, YYYY',
}

export const convertDateTimeToString = (time) => {
  const arrDate = R.split('-', time)
  const currentTime = R.trim(arrDate[1])
  return new Date(arrDate[0] + currentTime).toISOString()
}

export const getReminderBeforeNumber = (label) => {
  return R.find(R.propEq('label', label))(APP_CONFIG.reminderBefore).value
}

export const roundToNearestMinutes = (minutes = 15, d = new Date()) => {
  const ms = 1000 * 60 * minutes // convert minutes to ms
  const roundedDate = new Date(Math.round(d.getTime() / ms) * ms)

  return roundedDate
}
