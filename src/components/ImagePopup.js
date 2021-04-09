import Image from './Image';

function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup ${card && 'popup_opened'}`}>
      <div className="popup__zoom-image">
        <button onClick={onClose} type="button" className="popup__button-close" />
        <Image
          card={card}
          classStyleName="popup__image"
        />
        <h2 className="popup__title-zoom-image"> {card ? card.name : null} </h2>
      </div>
    </section>
  );
}

export default ImagePopup;