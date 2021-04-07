function Card() {
  
  return (
    <li key={card._id} className="element">
      <button type="button" className="element__trash-button" />
      <img src={card.link} alt="Фотография" className="element__image" />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button type="button" className="element__like" />
          <h3 className="element__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
} 

export default Card;