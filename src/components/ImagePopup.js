import filler from '../images/filler.jpg'

function ImagePopup({card, onClose}) {

  return (
    <section className = {`popup ${card && 'popup_opened'}`}>
      <div className = "popup__zoom-image">
        <button onClick = {onClose} type = "button" className = "popup__button-close" />
        <img
          src = {card ? card.link : null}
          alt = {card? card.name : null}
          className = "popup__image"
          onError = {evt => {
            evt.target.onerror = null;
            evt.target.src = filler;
            evt.target.alt = "Ошибка загрузки изображения";
          }}  
        />
        <h2 className = "popup__title-zoom-image"> {card? card.name : null} </h2>
      </div>
    </section>
  );
} 

export default ImagePopup;