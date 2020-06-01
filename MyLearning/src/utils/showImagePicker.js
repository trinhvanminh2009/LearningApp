import ImagePicker from 'react-native-image-picker'

export default async (options = { title: 'Change Avatar', }) => {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(
      {
        allowsEditing: true,
        mediaType: 'photo',
        noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'avatarPickerImages',
        },
        tintColor: '#44B3F2',
        title: options.title,
      },
      (response) => {
        const { didCancel, error, uri, width, height, } = response
        if (didCancel) {
          // resolve without any data
          resolve()
        } else if (error) {
          reject(error)
        } else {
          resolve({ uri, width, height, })
        }
      }
    )
  })
}
