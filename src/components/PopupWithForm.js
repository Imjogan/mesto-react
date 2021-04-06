function PopupWithForm(props) {
  return (
    <section className={`popup popup_section_${props.name} ${props.isOpen && 'popup_opened'}`}>
    {/* <section className={`popup popup_section_${props.name} ${(props.isOpen && !props.isClose) ? 'popup_opened' : ''}`}> */}
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__button-close" />
        <h2 className="popup__title">{props.title}</h2>
        <form noValidate name={`form-${props.name}`} className="form">
          {props.children}
          <button type="submit" className="form__button">{props.textOnSubmitButton}</button>
        </form>
      </div>
    </section>
  );
} 

export default PopupWithForm;