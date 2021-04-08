import filler from '../images/filler.jpg'
function Card({cardTransfer, card}) {
  
  // передаем данные карточки при вызове
  function handleClick() {
    cardTransfer(card);
  }

  return (
    <li className = "element">
      <button type = "button" className = "element__trash-button" />
      <img
        onClick = {handleClick}
        src = {card.link}
        alt = "Фотография"
        className = "element__image"
        onError = {evt => {
          evt.target.onerror = null;
          evt.target.src = filler;
        }}  
      />
      <div className = "element__container">
        <h2 className = "element__title"> {card.name} </h2>
        <div className = "element__like-group">
          <button type = "button" className = "element__like" />
          <h3 className = "element__like-counter"> {card.likes.length} </h3>
        </div>
      </div>
    </li>
  );
} 

export default Card;