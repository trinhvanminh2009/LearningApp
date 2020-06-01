import _service from './_service'

const tokenPost = ({
  token,
  refreshToken,
}) => (
  _service.post('/api/Token', {
    token,
    refreshToken,
  })
)

export default {
  tokenPost,
}
