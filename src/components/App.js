import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  // загружаем данные пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = (userObj) => {
    api.setUserInfo(userObj.name, userObj.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = (avatarObj) => {
    api.updateAvatar(avatarObj.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm
          name="card-add"
          title="Новое место"
          submitButtonText="Добавить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__fields">
            <label className="label">
              <input
                type="text"
                placeholder="Название"
                className="form__input form__input_field_card-name"
                name="cardName"
                required
                minLength="2"
                maxLength="30"
                id="card-name-input"
              />
              <span className="form__error card-name-input-error" />
            </label>
            <label className="label">
              <input
                type="url"
                placeholder="Ссылка на картинку"
                className="form__input form__input_field_card-link"
                name="cardLink"
                required id="card-link-input"
              />
              <span className="form__error card-link-input-error" />
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          textOnSubmitButton="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;