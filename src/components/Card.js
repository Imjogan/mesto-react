import Image from './Image';

function Card({ cardTransfer, card }) {

  // передаем данные карточки при вызове
  function handleClickImage() {
    cardTransfer(card);
  }

  return (
    <li className="element">
      <button type="button" className="element__trash-button" />
      <Image
        onClick={handleClickImage}
        card={card}
        classStyleName="element__image"
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