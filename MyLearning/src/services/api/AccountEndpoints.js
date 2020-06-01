import _service from './_service'

const accountLogoutPost = ({
  pushToken,
}) => (
  _service.post('/api/Account/logout', {
    data: pushToken,
  })
)

const accountManageGet = () => (
  _service.get('/api/Account/manage')
)

const accountCallHistoryGet = ({
  skip,
  take,
  SortColumn,
  SortType,
  Keyword,
}) => (
  _service.get('/api/Account/call-history', {
    skip,
    take,
    SortColumn,
    SortType,
    Keyword,
  })
)

const accountNumbersGet = () => (
  _service.get('/api/Account/numbers')
)

const accountNumbersPut = (phoneNumber) => (
  _service.put('/api/Account/numbers', phoneNumber)
)

export default {
  accountLogoutPost,
  accountManageGet,
  accountCallHistoryGet,
  accountNumbersGet,
  accountNumbersPut,
}
