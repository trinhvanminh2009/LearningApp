import _service from './_service'

const reminderContactRemindersGet = ({
  id,
}) => (
  _service.get(`/api/Reminder/${id}/reminders`)
)

const reminderAddReminderPost = (body) => (
  _service.post(`/api/reminder`, body)
)

const reminderDetailGet = ({
  id,
}) => (
  _service.get(`/api/Reminder/${id}`)
)

const reminderContactRemindersPut = (body) => (
  _service.put(`/api/Reminder`, body)
)

export default {
  reminderContactRemindersGet,
  reminderAddReminderPost,
  reminderDetailGet,
  reminderContactRemindersPut,
}
