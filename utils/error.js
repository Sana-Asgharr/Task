// import Toast from 'react-native-simple-toast'

export const getError = error => {
  const errorText = Object.values(error?.response?.data)
  if (errorText?.length > 0) {
    // Toast.show(`Error: ${JSON.stringify(errorText[0])}`)
  } else {
    // Toast.show(`Error: ${JSON.stringify(error?.message)}`)
  }
}

export const showCustomError = error => {
  if (error?.length > 0) {
    // Toast.show(`Error: ${error}`)
  }
}

export const showCustomSuccess = info => {
  if (info?.length > 0) {
    // Toast.show(`Success: ${info}`)
  }
}
