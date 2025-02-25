import { makeRequest } from "./requestBuilder"

export const API = {
  get: (url, token, body) =>
    makeRequest({
      method: "get",
      url,
      token,
      body
    }),

  post: (url, body, token) =>
    makeRequest({
      method: "post",
      body,
      url,
      token
    }),

  patch: (url, body, token) =>
    makeRequest({
      method: "patch",
      body,
      url,
      token
    }),

  put: (url, body, token) =>
    makeRequest({
      method: "put",
      body,
      url,
      token
    }),

  delete: (url, body, token) =>
    makeRequest({
      method: "delete",
      url,
      body,
      token
    })
}
