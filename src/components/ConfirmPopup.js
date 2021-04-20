import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onDeleteCard, card, buttonLoading }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      submitButtonText={buttonLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
