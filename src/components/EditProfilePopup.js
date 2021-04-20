import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <label className="label">
          <input
            type="text"
            className="form__input form__input_field_profile-name"
            name="profileName"
            required
            minLength="2"
            maxLength="40"
            id="profile-name-input"
            value={name}
            onChange={handleNameChange}
          />
          <span className="form__error profile-name-input-error" />
        </label>
        <label className="label">
          <input
            type="text"
            className="form__input form__input_field_profile-status"
            name="profileStatus"
            required
            minLength="2"
            maxLength="200"
            id="profile-status-input"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="form__error profile-status-input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;