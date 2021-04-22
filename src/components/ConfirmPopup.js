import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onDeleteCard, card, isLoading }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      submitButtonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
