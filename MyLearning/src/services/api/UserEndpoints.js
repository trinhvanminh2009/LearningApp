import _service from './_service'

const userAssigneesGet = ({ isUnassignInclude, }) => (
  _service.get('/api/User/assignees', { isUnassignInclude, })
)

const userAuthPost = ({
  email,
  password,
}) => (
  _service.post('/api/User/auth', {
    email,
    password,
  })
)

const userAvatarPost = ({ uri, }) => {
  // basic MIME type
  let type = 'application/octet-stream'
  const name = new Date().getTime().toString() + '-' + uri.replace(/^.*[\\\/]/, '') // eslint-disable-line no-useless-escape
  if (uri.slice(-4) === '.jpg' || uri.slice(-5) === '.jpeg') {
    type = 'image/jpeg'
  } else if (uri.slice(-4) === '.png') {
    type = 'image/png'
  }

  const image = { uri, type, name, }

  const body = new FormData()
  body.append('data', image)

  return _service.post('/api/User/avatar', body)
}

const userSwitchPost = ({
  accountId,
}) => (
  _service.post('/api/user/switch', {
    accountId,
  })
)

const userRegisterPushToken = ({
  deviceToken,
  userId,
  platform,
}) => (
  _service.post('/api/User/device-token', {
    deviceToken,
    userId,
    platform,
  })
)

const userBadgeCountGet = ({
  userId,
}) => (
  _service.get('/api/User/badge-count', {
    userId,
  })
)

const userNotificationConfigGet = () => (
  _service.get('/api/User/notifications')
)

const userNotificationConfigPut = ({
  isNewContactEnable,
  isNewMessageEnable,
}) => (
  _service.put('/api/User/notifications', {
    isNewContactEnable,
    isNewMessageEnable,
  })
)

export default {
  userAssigneesGet,
  userAuthPost,
  userAvatarPost,
  userBadgeCountGet,
  userNotificationConfigGet,
  userNotificationConfigPut,
  userRegisterPushToken,
  userSwitchPost,
}
