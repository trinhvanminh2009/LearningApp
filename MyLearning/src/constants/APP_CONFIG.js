import { displayName, name as slug, } from '../../app.json'

export default {
  // app specific
  contactStatuses: [
    {
      status: 'Lead',
      title: 'Lead',
      color: '#44B3F2', // Colors.blueCornflower,
    },
    {
      status: 'Responded',
      title: 'Responded',
      color: '#F9AC30', // Colors.yellowLighting,
    },
    {
      status: 'Showed',
      title: 'Showed',
      color: '#f3d479',
    },
    {
      status: 'Scheduled',
      title: 'Scheduled',
      color: '#79E5CB', // Colors.blueTurquoise,
    },
    {
      status: 'Won',
      title: 'Won',
      color: '#89CD7F', // Colors.greenDeYork,
    },
    {
      status: 'Stopped',
      title: 'Stopped',
      color: '#E57979', // Colors.redGeraldine,
    },
    {
      status: 'Lost',
      title: 'Lost',
      color: '#3577A2', // Colors.blueLochmara,
    },
  ],
  countryCodes: [
    {
      name: 'Canada (+1)',
      code: 'CA',
      callingCode: '+1',
    },
    {
      name: 'United States (+1)',
      code: 'US',
      callingCode: '+1',
    },
    {
      name: 'United Kingdom (+44)',
      code: 'GB',
      callingCode: '+44',
    },

  ],
  reminderBefore: [
    { label: 'None', value: -1, },
    { label: '0 minutes before', value: 0, },
    { label: '5 minutes before', value: 5, },
    { label: '10 minutes before', value: 10, },
    { label: '15 minutes before', value: 15, },
    { label: '30 minutes before', value: 30, },
    { label: '1 hour before', value: 60, },
    { label: '2 hours before', value: 120, },
    { label: '3 hours before', value: 180, },
    { label: '4 hours before', value: 240, },
    { label: '5 hours before', value: 300, },
    { label: '6 hours before', value: 360, },
    { label: '7 hours before', value: 420, },
    { label: '8 hours before', value: 480, },
    { label: '9 hours before', value: 540, },
    { label: '10 hours before', value: 600, },
    { label: '11 hours before', value: 660, },
    { label: '12 hours before', value: 720, },
    { label: '18 hours before', value: 1080, },
    { label: '1 day before', value: 1440, },
    { label: '2 days before', value: 2880, },
    { label: '3 days before', value: 4320, },
    { label: '4 days before', value: 5760, },
    { label: '1 week before', value: 10080, },
    { label: '2 weeks before', value: 20160, },
  ],
  typeOfMessage: {
    sms: 0,
    mms: 1,
    email: 2,
    voiceMail: 3,
    incomingCall: 4,
    outgoingCall: 5,
    facebook: 6,
  },
  typeOfFBMessage: {
    audio: 'audio',
    file: 'file',
    image: 'image',
    text: 'text',
    video: 'video',
  },
  typeOfMMS: {
    audio: 'audio',
    image: 'image',
    video: 'video',
  },
  screen: {
    editReminder: 'ContactEditReminders',
    addReminder: 'ContactAddReminders',
  },
  QUERY_PAGE_SIZE: 20,
  timerTick: 30, // seconds
  setTimeout: 2000, // seconds
  // generic config
  defaultAnimationDelay: 250, // ms
  defaultListEndReachedThreshold: 0.2,
  delayTextInputDebounce: 250,
  displayName,
  longAnimationDelay: 1000, // ms
  prefixReducer: slug,
  reconnectTimeout: 10000, // ms
}
