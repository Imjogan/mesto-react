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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isLoadingProfileInfo, setIsLoadingProfileInfo] = useState(false);
  const [isLoadingCardAdd, setIsLoadingCardAdd] = useState(false);
  const [isLoadingProfileAvatar, setIsLoadingProfileAvatar] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [currentDeletionCard, setCurrentDeletionCard] = useState(null);

  // загружаем данные пользователя и карточек
  useEffect(() => {
    api.getInitialData()
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

    api.toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        )
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    setCurrentDeletionCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleDeleteConfirm(card) {
    setIsLoadingConfirm(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((oldCards) =>
          oldCards.filter((oldCard) => oldCard._id !== card._id));
        closeAllPopups();
        setIsLoadingConfirm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoadingCardAdd(true);
    api.createCard(newCard.name, newCard.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        setIsLoadingCardAdd(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (userObj) => {
    setIsLoadingProfileInfo(true);
    api.setUserInfo(userObj.name, userObj.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoadingProfileInfo(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = (avatarObj) => {
    setIsLoadingProfileAvatar(true);
    api.updateAvatar(avatarObj.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoadingProfileAvatar(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
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
            isLoading={isLoadingProfileInfo}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isLoading={isLoadingCardAdd}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            card={currentDeletionCard}
            onDeleteCard={handleDeleteConfirm}
            onClose={closeAllPopups}
            isLoading={isLoadingConfirm}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup
            isLoading={isLoadingProfileAvatar}
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
