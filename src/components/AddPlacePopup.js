import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonLoading }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  const handleCardNameChange = (evt) => {
    setCardName(evt.target.value);
  };

  const handleCardLinkChange = (evt) => {
    setCardLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  };

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText={buttonLoading ? 'Добавление...' : 'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
            value={cardName}
            onChange={handleCardNameChange}
          />
          <span className="form__error card-name-input-error" />
        </label>
        <label className="label">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="form__input form__input_field_card-link"
            name="cardLink"
            required
            id="card-link-input"
            value={cardLink}
            onChange={handleCardLinkChange}
          />
          <span className="form__error card-link-input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
