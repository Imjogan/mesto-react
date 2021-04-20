import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = useContext(CurrentUserContext);

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


  function handleCardLike(card) {
    const isLiked = card.likes.some(likeOnCard => likeOnCard._id === currentUser._id);

    api.toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      });
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <a onClick={onEditAvatar} target="_self" href="#" className="profile__cover">
            <img
              alt="Аватар пользователя"
              src={currentUser.avatar}
              className="profile__avatar"
            />
          </a>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__button-edit"
            />
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button-add" />
      </section>
      <section>
        <ul className="elements">
          {cards.map(card => (
            <Card
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              getCard={onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;