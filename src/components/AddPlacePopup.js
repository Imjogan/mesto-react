import { useState, useEffect, useCallback } from 'react';
import PopupWithForm from './PopupWithForm';

const validators = {
  cardName: {
    required: (value) => value === '',
    minLength: (value) => value.length < 3,
    maxLength: (value) => value.length > 30,
  },
  cardLink: {
    required: (value) => value === '',
    url: (value) => !/^(ftp|http|https):\/\/[^ "]+$/.test(value),
  },
};

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [formValues, setFormValues] = useState({
    cardName: '',
    cardLink: '',
  });

  const [errors, setErrors] = useState({
    cardName: {
      required: true,
      minLength: true,
      maxLength: true,
    },
    cardLink: {
      required: true,
      url: true,
    },
  });

  useEffect(() => {
    setFormValues({
      cardName: '',
      cardLink: '',
    });
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
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
      const { cardName, cardLink } = formValues;

      const cardNameValidationRusult = Object.keys(validators.cardName)
        .map((errorKey) => {
          const errorResult = validators.cardName[errorKey](cardName);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});

      const cardLinkValidationRusult = Object.keys(validators.cardLink)
        .map((errorKey) => {
          const errorResult = validators.cardLink[errorKey](cardLink);
          return { [errorKey]: errorResult };
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});

      setErrors({
        cardName: cardNameValidationRusult,
        cardLink: cardLinkValidationRusult,
      });
    },
    [formValues, setErrors]
  );

  const { cardName, cardLink } = formValues;
  const isСardNameInvalid = Object.values(errors.cardName).some(Boolean);
  const isСardLinkInvalid = Object.values(errors.cardLink).some(Boolean);
  const isSubmitDisabled = isСardNameInvalid || isСardLinkInvalid;

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText={isLoading ? 'Добавление...' : 'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValidity={isSubmitDisabled}
    >
      <fieldset className="form__fields">
        <label className="label">
          <input
            type="text"
            placeholder="Название"
            className={`form__input ${
              (errors.cardName.required ||
                errors.cardName.maxLength ||
                errors.cardName.minLength) &&
              'form__input_type_error'
            }`}
            name="cardName"
            required
            minLength="2"
            maxLength="30"
            id="card-name-input"
            value={cardName}
            onChange={handleInputChange}
          />
          <span
            className={`form__error ${
              (errors.cardName.required ||
                errors.cardName.maxLength ||
                errors.cardName.minLength) &&
              'form__error_visible'
            }`}
          >
            {' '}
            {errors.cardName.required || errors.cardName.minLength
              ? errors.cardName.required
                ? 'Поле обязательно для заполнения'
                : 'Введите фразу не короче 2 символов'
              : ''}
            {errors.cardName.maxLength && 'Превышел лимит в 30 символов'}
          </span>
        </label>
        <label className="label">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className={`form__input ${
              (errors.cardLink.required || errors.cardLink.url) &&
              'form__input_type_error'
            }`}
            name="cardLink"
            required
            id="card-link-input"
            value={cardLink}
            onChange={handleInputChange}
          />
          <span
            className={`form__error ${
              (errors.cardLink.required || errors.cardLink.url) &&
              'form__error_visible'
            }`}
          >
            {' '}
            {errors.cardLink.required || errors.cardLink.url
              ? errors.cardLink.required
                ? 'Поле обязательно для заполнения'
                : 'Введите URL'
              : ''}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
