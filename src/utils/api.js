class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  // получаем информацию о карточках
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // отправляем информацию о пользователе
  setUserInfo(name, status) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // создаем карточку
  createUserInfo(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // удаляем карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // ставим/убираем лайк
  toggleCardLike(cardId, hasLike) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: hasLike ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // обновляем аватар
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

// создаем класс для связи с сервером
const api = new Api({
  // базовый адрес обращения
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    // уникальный токен пользователя
    authorization: 'a3ab0050-d01a-4f5a-9bb4-4a039b0aa641',
    // MIME Type - формат отправляемых данных (формат JSON)
    'Content-Type': 'application/json'
  }
});

export default api;