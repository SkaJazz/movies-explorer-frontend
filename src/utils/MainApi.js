class MainApi {
  constructor(url) {
    this._url = url;
  }

  _sendRequest = ({
    method,
    path,
    contentType = 'application/json',
    body = null,
    authToken = null,
  }) =>
    fetch(new URL(path, this._url), {
      method,
      headers: {
        authorization: authToken,
        'Content-Type': contentType,
      },
      body,
    }).then(res => this._checkServerResponseMiddleware(res));

  _checkServerResponseMiddleware = res => res.ok ? res.json() : Promise.reject(res.statusText);

  signUp = ({ email, name, password }) =>
    this._sendRequest({
      method: 'POST',
      path: 'signup',
      body: JSON.stringify({
        password,
        email,
        name
      }),
    });

  signIn = ({ email, password }) =>
    this._sendRequest({
      method: 'POST',
      path: 'signin',
      body: JSON.stringify({
        password,
        email,
      }),
    });

  getUserInfo = token =>
    this._sendRequest({
      method: 'GET',
      path: 'users/me',
      authToken: `Bearer ${token}`,
    });

  updateUser = ({ token, userData }) =>
    this._sendRequest({
      method: 'PATCH',
      path: 'users/me',
      authToken: `Bearer ${token}`,
      body: JSON.stringify(userData),
    });

  getMovies = token =>
    this._sendRequest({
      method: 'GET',
      path: 'movies',
      authToken: `Bearer ${token}`,
    });
  ;

  postMovie = ({ token, movieDataToRequest }) => this._sendRequest({
    method: 'POST',
    path: 'movies',
    authToken: `Bearer ${token}`,
    body: JSON.stringify(movieDataToRequest),
  });

  removeMovie = (token, movieId) =>
    this._sendRequest({
      method: 'DELETE',
      path: `movies/${movieId}`,
      authToken: `Bearer ${token}`,
    });
}

const mainApi = new MainApi('https://api.nomoredomains.club');

export default mainApi;
