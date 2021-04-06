function ImagePopup() {
  return (
    <section className="popup popup_section_image-zoom">
      <div className="popup__zoom-image">
        <button type="button" className="popup__button-close" />
        <img src="#" alt="#" className="popup__image" />
        <h2 className="popup__title-zoom-image" />
      </div>
    </section>
  );
} 

export default ImagePopup;