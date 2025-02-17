// import Toast from "react-native-simple-toast"

export const validateEmail = value => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = pattern.test(String(value).toLowerCase())
  return isValid
}

export const getError = error => {
  const errorText = Object.values(error?.response?.data)
  const errorTextKeys = Object.keys(error?.response?.data)
  if (error?.response?.data?.message) {
    // Toast.show(`Error: ${JSON.stringify(error?.response?.data?.message)}`)
  } else if (errorText?.length > 0) {
    if (Array.isArray(errorText[0]) && errorText[0]?.length > 0) {
      // Toast.show(`Error: ${JSON.stringify(errorTextKeys?.[0] + " " + errorText?.[0]?.[0])}`)
    } else {
      // Toast.show(`Error: ${JSON.stringify(errorTextKeys?.[0] + " " + errorText?.[0])}`)
    }
  } else {
    // Toast.show(`Error: ${JSON.stringify(error?.message)}`)
  }
}

export const getPayload = queryParams => {
  const falsyValues = [undefined, null, "", 0, false, "Invalid date", "null"]

  const payloadEntries = Object.entries(queryParams).filter(
    ([key, value]) => !falsyValues.includes(value)
  )
  const queryString = new URLSearchParams(queryParams).toString()

  return `?${queryString}`
}
