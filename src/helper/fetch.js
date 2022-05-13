import base64 from 'base-64';
import {handleError} from './error';

export function handleResponse(doAfterSuccess) {
  return response => {
    if (response.ok) {
      return doAfterSuccess(response);
    } else {
      throw new Error('Response is ' + response.status);
    }
  };
}

export function handleFetchError(backendUrl) {
  return handleError('Backend URL: ' + backendUrl);
}

export function fetchData(backendUrl, username, password, setData, setLoading) {
  fetch(backendUrl, {headers: getAuthorizationHeader(username, password)})
    .then(handleResponse(response => response.json()))
    .then(json => setData(json))
    .catch(handleFetchError(backendUrl))
    .finally(() => setLoading(false));
}

export function getAuthorizationHeader(username, password) {
  return {
    Authorization: 'Basic ' + base64.encode(username + ':' + password),
  };
}
