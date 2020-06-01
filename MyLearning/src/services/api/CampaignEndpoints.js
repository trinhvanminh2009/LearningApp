import _service from './_service'

const campaignGet = ({
  skip,
  take,
  SortColumn,
  SortType,
  Keyword,
}) => (
  _service.get('api/Campaign', {
    skip,
    take,
    SortColumn,
    SortType,
    Keyword,
  })
)

export default {
  campaignGet,
}
