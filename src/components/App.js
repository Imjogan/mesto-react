import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import RenderLoading from './RenderLoading';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [
    isLoadingOnButtonProfileInfo,
    setLoadingOnButtonProfileInfo,
  ] = useState(false);
  const [isLoadingOnButtonCardAdd, setLoadingOnButtonCardAdd] = useState(false);
  const [
    isLoadingOnButtonProfileAvatar,
    setLoadingOnButtonProfileAvatar,
  ] = useState(false);
  const [isLoadingOnButtonConfirm, setLoadingOnButtonConfirm] = useState(false);
  const [isCurrentCardOnDelete, setCurrentCardOnDelete] = useState(null);

  // загружаем данные пользователя и карточек
  useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [cards, userInfo] = data;
        setDataLoading(false);
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (likeOnCard) => likeOnCard._id === currentUser._id
    );

    api.toggleCardLike(card._id, isLiked).then((newCard) => {
      setCards((state) =>
        state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
      );
    });
  }

  function handleCardDelete(card) {
    setCurrentCardOnDelete(card);
    setConfirmPopupOpen(true);
  }

  function handleDeleteConfirm(card) {
    setLoadingOnButtonConfirm(true);
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((oldCard) => oldCard._id !== card._id));
      closeAllPopups();
      setLoadingOnButtonConfirm(false);
    });
  }

  const handleAddPlaceSubmit = (newCard) => {
    setLoadingOnButtonCardAdd(true);
    api.createCard(newCard.name, newCard.link).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
      setLoadingOnButtonCardAdd(false);
    });
  };

  const handleUpdateUser = (userObj) => {
    setLoadingOnButtonProfileInfo(true);
    api.setUserInfo(userObj.name, userObj.about).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      setLoadingOnButtonProfileInfo(false);
    });
  };

  const handleUpdateAvatar = (avatarObj) => {
    setLoadingOnButtonProfileAvatar(true);
    api.updateAvatar(avatarObj.avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      setLoadingOnButtonProfileAvatar(false);
    });
  };

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
    setConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      {dataLoading ? (
        <RenderLoading />
      ) : (
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
          <EditProfilePopup
            buttonLoading={isLoadingOnButtonProfileInfo}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            buttonLoading={isLoadingOnButtonCardAdd}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            card={isCurrentCardOnDelete}
            onDeleteCard={handleDeleteConfirm}
            onClose={closeAllPopups}
            buttonLoading={isLoadingOnButtonConfirm}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup
            buttonLoading={isLoadingOnButtonProfileAvatar}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
