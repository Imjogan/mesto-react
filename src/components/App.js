import React, { useState } from 'react'; 
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name = "profile-edit"
        title = "Редактировать профиль"
        submitButtonText = "Сохранить"
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <fieldset className = "form__fields">
          <label className = "label">
            <input
              type = "text"
              className = "form__input form__input_field_profile-name"
              name = "profileName"
              required
              minLength = "2"
              maxLength = "40"
              id = "profile-name-input"
            />
            <span className = "form__error profile-name-input-error" />
          </label>
          <label className = "label">
            <input
              type = "text"
              className = "form__input form__input_field_profile-status"
              name = "profileStatus"
              required
              minLength = "2"
              maxLength = "200"
              id = "profile-status-input"
            />
            <span className = "form__error profile-status-input-error" />
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name = "card-add"
        title = "Новое место"
        submitButtonText = "Добавить"
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <fieldset className = "form__fields">
          <label className = "label">
            <input
              type = "text"
              placeholder = "Название"
              className = "form__input form__input_field_card-name"
              name = "cardName"
              required
              minLength = "2"
              maxLength = "30"
              id = "card-name-input"
            />
            <span className = "form__error card-name-input-error" />
          </label>
          <label className = "label">
            <input
              type = "url"
              placeholder = "Ссылка на картинку"
              className = "form__input form__input_field_card-link"
              name = "cardLink"
              required id = "card-link-input"
            />
            <span className = "form__error card-link-input-error" />
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name = "delete-confirm"
        title = "Вы уверены?"
        textOnSubmitButton = "Да"
      />
      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
      />
      <PopupWithForm
        name = "update-avatar"
        title = "Обновить аватар"
        submitButtonText = "Сохранить"
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <fieldset className = "form__fields">
          <label className = "label">
            <input
              type = "url"
              placeholder = "Ссылка на фотографию"
              className = "form__input form__input_field_avatar-link"
              name = "avatarLink"
              required
              id = "avatar-link-input" />
            <span className = "form__error avatar-link-input-error" />
          </label>
        </fieldset>
      </PopupWithForm>
    </div>
  );
}

export default App;