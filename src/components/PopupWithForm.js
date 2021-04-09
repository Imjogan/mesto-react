function PopupWithForm({ name, title, submitButtonText, isOpen, onClose, children }) {

  return (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__button-close" />
        <h2 className="popup__title">{title}</h2>
        <form noValidate name={`form-${name}`} className="form">
          {children}
          <button type="submit" className="form__button"> {submitButtonText} </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;