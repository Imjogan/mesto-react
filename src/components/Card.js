import Image from './Image';

function Card({ getCard, card }) {

  function handleClickImage() {
    getCard(card);
  }

  return (
    <li className="element">
      <button type="button" className="element__trash-button" />
      <Image
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClickImage}
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