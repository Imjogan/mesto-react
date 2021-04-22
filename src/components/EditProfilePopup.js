import { useState, useContext, useEffect, useCallback } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [formValues, setFormValues] = useState({
    userName: '',
    description: '',
  });

  const [formValidity, setformValidity] = useState({
    userNameValid: false,
    descriptionValid: false,
  });

  useEffect(() => {
    if (currentUser.name !== undefined && currentUser.about !== undefined) {
      setFormValues({
        userName: currentUser.name,
        description: currentUser.about,
      });
    }
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: userName,
      about: description,
    });
  };

  const handleInputChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setFormValues((state) => ({ ...state, [name]: value }));
    },
    [setFormValues]
  );

  useEffect(
    function validateInputs() {
      const isUserNameValid =
        formValues.userName.length > 2 && formValues.userName.length < 40;
      const isDescriptionValid =
        formValues.description.length > 2 &&
        formValues.description.length < 200;

      setformValidity((state) => ({
        userNameValid: isUserNameValid,
        descriptionValid: isDescriptionValid,
      }));
    },
    [formValues, setformValidity]
  );

  const { userName, description } = formValues;
  const { userNameValid, descriptionValid } = formValidity;
  const isSubmitDisabled = !userNameValid || !descriptionValid;

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValidity={isSubmitDisabled}
    >
      <fieldset className="form__fields">
        <label className="label">
          <input
            type="text"
            className={`form__input ${
              !userNameValid && 'form__input_type_error'
            }`}
            name="userName"
            required
            minLength="2"
            maxLength="40"
            id="profile-name-input"
            value={userName}
            onChange={handleInputChange}
          />
          <span
            className={`form__error ${!userNameValid && 'form__error_visible'}`}
          >
            Ошибка
          </span>
        </label>
        <label className="label">
          <input
            type="text"
            className={`form__input ${
              !descriptionValid && 'form__input_type_error'
            }`}
            name="description"
            required
            minLength="2"
            maxLength="200"
            id="profile-status-input"
            value={description}
            onChange={handleInputChange}
          />
          <span
            className={`form__error ${
              !descriptionValid && 'form__error_visible'
            }`}
          >
            Ошибка
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
