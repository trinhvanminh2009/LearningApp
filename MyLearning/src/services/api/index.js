import _service from './_service'
import AccountEndpoints from './AccountEndpoints'
import CampaignEndpoints from './CampaignEndpoints'
import ConversationEndpoints from './ConversationEndpoints'
import ProspectEndpoints from './ProspectEndpoints'
import ReminderEndpoints from './ReminderEndpoints'
import TokenEndpoints from './TokenEndpoints'
import UserEndpoints from './UserEndpoints'

export default {
  getHeaders: () => (_service.headers),
  setHeaders: _service.setHeaders,
  // api endpoints
  ...AccountEndpoints,
  ...CampaignEndpoints,
  ...ConversationEndpoints,
  ...ProspectEndpoints,
  ...ReminderEndpoints,
  ...TokenEndpoints,
  ...UserEndpoints,
}
