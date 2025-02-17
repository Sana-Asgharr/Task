import { API } from './'

export const nearbyLocations = payload => {
  return API.get('api/v1/location/', payload)
}
