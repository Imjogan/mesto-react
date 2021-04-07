// портируем для хуков
import React from 'react';
// портируем стили и необходимые компоненты
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// основной компонент приложения
function App() {

  // создаем state переменные для попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // создаем state переменную для загрузки данных карточки в попап
  const [selectedCard, setSelectedCard] = React.useState(false);

  // изменяем значения соответствующих переменных состояния
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  // сбрасываем все state переменные в false для закрытия попапа
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  // разметка
  return (
    <div className="page">
      {/* компонент Header */}
      <Header />
      {/* компонент Main с пропсами для открытия попапов */}
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      {/* компонент Footer */}
      <Footer />
      {/* Popup редактирования профиля: пропсы для наполнения и управления попапом */}
      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        textOnSubmitButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* разметка props.children */}
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
      {/* Popup добавления карточки: пропсы для наполнения и управления попапом */}
      <PopupWithForm
        name="card-add"
        title="Новое место"
        textOnSubmitButton="Добавить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {/* разметка props.children */}
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
      {/* Popup подтверждения удаления карточки: подготовлен, но не реализован */}
      <PopupWithForm name="delete-confirm" title="Вы уверены?" textOnSubmitButton="Да" />
      {/* Popup увеличения изображений: пропсы для наполнения и управления попапом */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      {/* Popup обновления аватара: пропсы для наполнения и управления попапом */}
      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        textOnSubmitButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        {/* разметка props.children */}
        <fieldset className="form__fields">
          <label className="label">
            <input type="url" placeholder="Ссылка на фотографию" className="form__input form__input_field_avatar-link"
              name="avatarLink" required id="avatar-link-input" />
            <span className="form__error avatar-link-input-error" />
          </label>
        </fieldset>
      </PopupWithForm>
    </div>
  );
}

export default App;