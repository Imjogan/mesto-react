function Card(props) {
  
  // передаем данные карточки при вызове
  function handleClick() {
    props.cardTransfer(props.card);
  }  

  // разметка
  return (
    <li className="element">
      <button type="button" className="element__trash-button" />
      <img onClick={handleClick} src={props.card.link} alt="Фотография" className="element__image" />
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button type="button" className="element__like" />
          <h3 className="element__like-counter">{props.card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
} 

export default Card;