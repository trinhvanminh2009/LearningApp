import _service from './_service'

const prospectCallsGet = ({
  id,
}) => (
  _service.get(`/api/Prospect/${id}/call`)
)

const prospectDeletePost = (
  body,
) => (
  _service.post('/api/Prospect/delete', body)
)

const prospectDeletedItemsGet = ({
  id,
}) => (
  _service.get(`/api/Prospect/deletedItems/${id}`)
)

const prospectGet = ({
  skip,
  take,
  SortColumn,
  SortType,
  CampaignIds,
  Keyword,
  LeadStatus,
}) => (
  _service.get('/api/Prospect', {
    skip,
    take,
    SortColumn,
    SortType,
    CampaignIds,
    Keyword,
    LeadStatus,
  })
)

const prospectPost = ({
  assigneeId,
  campaignId,
  email,
  firstName,
  isSaving,
  lastName,
  leadStatus,
  phoneNumber,
  revenue,
  company,
}) => (
  _service.post('/api/Prospect', {
    assigneeId,
    campaignId,
    email,
    firstName,
    isSaving,
    lastName,
    leadStatus,
    phoneNumber,
    revenue,
    company,
  })
)

const prospectPut = ({
  contact,
}) => (
  _service.put('/api/Prospect', contact)
)

const prospectAssignPost = ({ contactId, assigneeId, }) => (
  _service.post('/api/Prospect/assign', {
    prospectIds: [ contactId, ],
    userId: assigneeId,
  })
)

const prospectNotesPost = ({ key, value, }) => (
  _service.post('/api/Prospect/notes', { key, value, })
)

const prospectNotesPut = ({ key, value, }) => (
  _service.put('/api/Prospect/notes', { key, value, })
)

const prospectReadPut = ({ contactId, }) => (
  _service.put('/api/Prospect/read', { data: contactId, })
)

const prospectContactTagsGet = () => (
  _service.get(`/api/Account/tag-item`)
)

const prospectContactAddTagsPost = ({ body, }) => (
  _service.post(`/api/Prospect/prospects-tags`, body)
)

const prospectContactRemoveTagDelete = ({ body, }) => (
  _service.delete(`/api/Prospect/tags`, body)
)

export default {
  prospectCallsGet,
  prospectDeletedItemsGet,
  prospectDeletePost,
  prospectGet,
  prospectAssignPost,
  prospectNotesPost,
  prospectNotesPut,
  prospectPost,
  prospectPut,
  prospectReadPut,
  prospectContactTagsGet,
  prospectContactAddTagsPost,
  prospectContactRemoveTagDelete,
}
