import { useState } from 'react';
import filler from '../images/filler.jpg'
function Card({ cardTransfer, card }) {

  const [isLoadError, setIsLoadError] = useState(false);

  function handleLoadError() {
    setIsLoadError(true);
  }

  // передаем данные карточки при вызове
  function handleClickImage() {
    cardTransfer(card);
  }

  return (
    <li className="element">
      <button type="button" className="element__trash-button" />
      <img
        onClick={handleClickImage}
        src={isLoadError ? filler : card.link}
        alt={`На фотографии - ${card.name}`}
        className="element__image"
        onError={handleLoadError}
      />
      <div className="element__container">
        <h2 className="element__title"> {card.name} </h2>
        <div className="element__like-group">
          <button type="button" className="element__like" />
          <h3 className="element__like-counter"> {card.likes.length} </h3>
        </div>
      </div>
    </li>
  );
}

export default Card;