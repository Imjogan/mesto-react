import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        {/* Popup редактирования профиля */}
        <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          textOnSubmitButton="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__fields">
            <label className="label">
              <input type="text" className="form__input form__input_field_profile-name"
                name="profileName" required minLength="2" maxLength="40" id="profile-name-input" />
              <span className="form__error profile-name-input-error" />
            </label>
            <label className="label">
              <input type="text" className="form__input form__input_field_profile-status"
                name="profileStatus" required minLength="2" maxLength="200" id="profile-status-input" />
              <span className="form__error profile-status-input-error" />
            </label>
          </fieldset>
        </PopupWithForm>
        {/* Popup добавления карточки */}
        <PopupWithForm
          name="card-add"
          title="Новое место"
          textOnSubmitButton="Добавить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__fields">
            <label className="label">
              <input type="text" placeholder="Название" className="form__input form__input_field_card-name"
                name="cardName" required minLength="2" maxLength="30" id="card-name-input" />
              <span className="form__error card-name-input-error" />
            </label>
            <label className="label">
              <input type="url" placeholder="Ссылка на картинку" className="form__input form__input_field_card-link"
                name="cardLink" required id="card-link-input" />
              <span className="form__error card-link-input-error" />
            </label>
          </fieldset>
        </PopupWithForm>
        {/* Popup подтверждения удаления карточки */}
        <PopupWithForm name="delete-confirm" title="Вы уверены?" textOnSubmitButton="Да" />
        {/* Popup увеличения изображений */}
        <ImagePopup />
        <section className="popup popup_section_image-zoom">
          <div className="popup__zoom-image">
            <button type="button" className="popup__button-close popup__button-close_section_image-zoom" />
            <img src="#" alt="#" className="popup__image" />
            <h2 className="popup__title-zoom-image" />
          </div>
        </section>
        {/* Popup обновления аватара */}
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          textOnSubmitButton="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__fields">
            <label className="label">
              <input type="url" placeholder="Ссылка на фотографию" className="form__input form__input_field_avatar-link"
                name="avatarLink" required id="avatar-link-input" />
              <span className="form__error avatar-link-input-error" />
            </label>
          </fieldset>
        </PopupWithForm>
      </div>
      {/* template для карточек */}
      <template id="card-template">
        <li className="element">
          <button type="button" className="element__trash-button" />
          <img src="#" alt="alt" className="element__image" />
          <div className="element__container">
            <h2 className="element__title" />
            <div className="element__like-group">
              <button type="button" className="element__like" />
              <h3 className="element__like-counter" />
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;