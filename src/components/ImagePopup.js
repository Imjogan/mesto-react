// компонент попап открытой карточки
function ImagePopup(props) {

  // разметка
  return (
    // проверяем условие: если пропс не false - добавляем класс
    <section className={`popup popup_section_image-zoom ${props.card && 'popup_opened'}`}>
      <div className="popup__zoom-image">
        <button onClick={props.onClose} type="button" className="popup__button-close" />
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <h2 className="popup__title-zoom-image">{props.card.name}</h2>
      </div>
    </section>
  );
} 

export default ImagePopup;