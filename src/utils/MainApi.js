class MainApi {
  constructor(url) {
    this._url = url;
  }

  _sendRequest = ({
    method,
    path,
    contentType = "application/json",
    body = null,
    authToken = null,
  }) =>
    fetch(new URL(path, this._url), {
      method,
      headers: {
        authorization: authToken,
        "Content-Type": contentType,
      },
      body,
    }).then((res) => this._checkServerResponseMiddleware(res));

  _checkServerResponseMiddleware = (res) => {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  signUp = ({ email, password }) =>
    this._sendRequest({
      method: "POST",
      path: "signup",
      body: JSON.stringify({
        password,
        email,
      }),
    });

  signIn = ({ email, password }) =>
    this._sendRequest({
      method: "POST",
      path: "signin",
      body: JSON.stringify({
        password,
        email,
      }),
    });

  getUserInfo = (token) =>
    this._sendRequest({
      method: "GET",
      path: "users/me",
      authToken: `Bearer ${token}`,
    });

  updateUser = (token) => {
    this._sendRequest({
      method: "PATCH",
      path: "users/me",
      authToken: `Bearer ${token}`,
    });
  };

  getMovies = (token) => {
    this._sendRequest({
      method: "GET",
      path: "movies",
      authToken: `Bearer ${token}`,
    });
  };

  postMovie = (token, movie) => {
    this._sendRequest({
      method: "GET",
      path: "movies",
      authToken: `Bearer ${token}`,
      body: JSON.stringify(movie),
    });
  };

  removeMovie = (token, movieId) => {
    this._sendRequest({
      method: "DELETE",
      path: `movies/${movieId}`,
      authToken: `Bearer ${token}`,
    });
  };
}

const mainApi = new MainApi("https://api.nomoredomains.club");

export default mainApi;
