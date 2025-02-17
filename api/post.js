import { API } from "./"

export const savePost = (payload, token) => {
  return API.post(`api/v1/save-post/`, payload, token)
}

