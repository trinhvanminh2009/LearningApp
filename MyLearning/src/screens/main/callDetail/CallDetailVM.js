import { compose, withCallback, withEffect, withHook, } from '@truefit/bach'
import { useDispatch, useSelector, } from 'react-redux'
import { ActionSheet, } from 'native-base'
import R from 'ramda'
import { useMemo, } from 'react'
import View from './CallDetailV'

const useConnect = (contactId) => {
  // mapState

}

export default compose(
  withHook(useConnect, ({ contactId, }) => (contactId), 'rdx'),
  withEffect(({ rdx, }) => {
    // mount
    rdx.onGetContactDetail()
    rdx.onGetContactDetailCalls()
    rdx.onActionChange()
  }, []), // run once
  withCallback(
    '_onNavConversation',
    ({ onNavConversationScreen, id, rdx: { contact, contactConversationId, }, }) => (initialComposer) => {
      const firstName = R.path([ 'firstName', ])(contact) || ''
      const lastName = R.path([ 'lastName', ])(contact) || ''
      const name = `${firstName} ${lastName}`.trim()

      onNavConversationScreen({
        conversationId: contactConversationId || (contact && contact.conversationId),
        conversationContact: { id, name, ...contact, },
        initialComposer,
      })
    },
    [ 'onNavConversationScreen', 'id', 'rdx.contact', 'rdx.contactConversationId', ]
  ),
  withCallback(
    '_onNavCalling',
    ({ onNavCalling, rdx: { onStartCall, }, phoneNumber, }) => async () => {
      await onStartCall(phoneNumber)
      onNavCalling()
    },
    [ 'onNavCalling', 'rdx.contact', 'rdx.onStartCall', 'phoneNumber', ]
  ),
  withCallback(
    '_onNavConversationSMS',
    ({ _onNavConversation, }) => () => {
      _onNavConversation('sms')
    },
    [ '_onNavConversation', ]
  ),
  withCallback(
    '_onNavConversationEmail',
    ({ _onNavConversation, }) => () => {
      _onNavConversation('email')
    },
    [ '_onNavConversation', ]
  ),
  withCallback(
    '_onNavContactInfo',
    ({ onNavContactInfo, contactId, rdx: { contact, }, }) => () => {
      if (!contact) { return }
      onNavContactInfo({ contactId, })
    },
    [ 'onNavContactInfo', 'contactId', 'rdx.contact', ]
  ),
  withCallback('onBlock',
    ({ onNavBack, rdx, }) => async () => {
      await rdx.onActionChange('block')
      onNavBack()
    }, [ 'onNavBack', 'rdx', ]),
  withCallback(
    '_onNavContactAdd',
    ({ onNavContactAdd, id, rdx: { conversationId, contact, }, }) => () => {
      const firstName = R.path([ 'firstName', ])(contact) || ''
      const lastName = R.path([ 'lastName', ])(contact) || ''
      const name = `${firstName} ${lastName}`.trim()

      onNavContactAdd({ conversationId: conversationId, conversationContact: { id, name, ...contact, }, })
    }, [ 'onNavContactAdd', 'rdx', 'id', ]
  ),
  withCallback(
    'onOpenOptions',
    ({ onBlock, _onNavContactAdd, contactId, }) => () => {
      const options = !contactId ? [

        'Add New Contact',
        'Cancel',
      ] : []

      const cancelButtonIndex = options.length - 1
      ActionSheet.show(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              !contactId && (_onNavContactAdd())
              break
            default:
              break
          }
        }
      )
    }, [ 'onBlock', '_onNavContactAdd', 'contactId', ]
  ),
)(View)
