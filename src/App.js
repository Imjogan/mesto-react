import avatar from './images/avatar.jpg';
import './index.css';

function App() {
  return (
    <>
      <div className="page">
        <header className="header">
          <a href="#" target="_self" className="header__logo" />
        </header>
        <main className="main">
          <section className="profile">
            <div className="profile__container">
              <a target="_self" href="#" className="profile__cover">
                <img alt="Аватарка" src={avatar} className="profile__avatar" />
              </a>
              <div className="profile__info">
                <h1 className="profile__name">Жак-Ив Кусто</h1>
                <button type="button" className="profile__button-edit" />
                <p className="profile__status">Исследователь океана</p>
              </div>
            </div>
            <button type="button" className="profile__button-add" />
          </section>
          <section>
            <ul className="elements" />
          </section>
        </main>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2021. Mesto-React Russia</p>
        </footer>
        {/* Popup редактирования профиля */}
        <section className="popup popup_section_profile-edit">
          <div className="popup__container">
            <button type="button" className="popup__button-close popup__button-close_section_profile-edit" />
            <h2 className="popup__title">Редактировать профиль</h2>
            <form noValidate name="form-profile-edit" className="form form_section_profile-edit">
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
                <button type="submit" className="form__button form__button_section_profile-edit">Сохранить</button>
              </fieldset>
            </form>
          </div>
        </section>
        {/* Popup добавления карточки */}
        <section className="popup popup_section_card-add">
          <div className="popup__container">
            <button type="button" className="popup__button-close popup__button-close_section_card-add" />
            <h2 className="popup__title">Новое место</h2>
            <form noValidate name="form-card-add" className="form form_section_card-add">
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
                <button type="submit" className="form__button form__button_section_card-add">Добавить</button>
              </fieldset>
            </form>
          </div>
        </section>
        {/* Popup подтверждения удаления карточки */}
        <section className="popup popup_section_delete-confirm">
          <div className="popup__container">
            <button type="button" className="popup__button-close popup__button-close_section_delete-confirm" />
            <h2 className="popup__title popup__title_section_delete-confirm">Вы уверены?</h2>
            <form noValidate name="form-delete-confirm" className="form form_section_delete-confirm">
              <button type="submit" className="form__button form__button_section_delete-confirm">Да</button>
            </form>
          </div>
        </section>
        {/* Popup увеличения изображений */}
        <section className="popup popup_section_image-zoom">
          <div className="popup__zoom-image">
            <button type="button" className="popup__button-close popup__button-close_section_image-zoom" />
            <img src="#" alt="#" className="popup__image" />
            <h2 className="popup__title-zoom-image" />
          </div>
        </section>
        {/* Popup обновления аватара */}
        <section className="popup popup_section_update-avatar">
          <div className="popup__container">
            <button type="button" className="popup__button-close popup__button-close_section_update-avatar" />
            <h2 className="popup__title">Обновить аватар</h2>
            <form noValidate name="form-update-avatar" className="form form_section_update-avatar">
              <fieldset className="form__fields">
                <label className="label">
                  <input type="url" placeholder="Ссылка на фотографию" className="form__input form__input_field_avatar-link"
                    name="avatarLink" required id="avatar-link-input" />
                  <span className="form__error avatar-link-input-error" />
                </label>
                <button type="submit" className="form__button form__button_section_update-avatar">Сохранить</button>
              </fieldset>
            </form>
          </div>
        </section>
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