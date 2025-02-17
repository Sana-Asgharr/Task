import { API } from "./"

export const getMyCards = token => {
  return API.get("api/v1/payments/my_cards/", token)
}

