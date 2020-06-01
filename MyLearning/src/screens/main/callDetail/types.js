import { Call, Contact, } from '@src/models'
export type VMProps = {
  contactId: string,
  onNavContactDetailScreen: () => void,
  onNavConversationScreen: ({
    conversationId: string,
    conversationContact: {},
  }) => void,
  onNavCalling: () => void,
  onNavBack: () => void,
}

export type VProps = VMProps & {
  rdx: {
    calls?: Call[],
    contact?: Contact,
  },
  displayData: {
    contactName: string,
    contactPhone: string,
    initials: string,
  },
  _onNavConversationScreen: () => void,
  onCall: () => void,
}
