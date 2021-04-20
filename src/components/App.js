import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // загружаем данные пользователя и карточек
  useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  // загружаем данные пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(likeOnCard =>
      likeOnCard._id === currentUser._id);

    api.toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) =>
            oldCard._id === card._id ? newCard : oldCard));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() =>
        setCards(cards.filter(oldCard =>
          oldCard._id !== card._id)));
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.createCard(newCard.name, newCard.link)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
  } 

  const handleUpdateUser = (userObj) => {
    api.setUserInfo(userObj.name, userObj.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = (avatarObj) => {
    api.updateAvatar(avatarObj.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          textOnSubmitButton="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;