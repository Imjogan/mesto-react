import { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  // загружаем данные пользователя и карточек
  useEffect(() => {
    api.getInitialData()
      .then(data => {
        const [initialCardsData, initialUserData] = data;
        setUserAvatar(initialUserData.avatar);
        setUserName(initialUserData.name);
        setUserDescription(initialUserData.about);
        setCards(initialCardsData);
      }).catch(error => {
        console.log(error);
      })
    // зависимостей нет, запускаем один раз при загрузке страницы
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <a onClick={onEditAvatar} target="_self" href="#" className="profile__cover">
            <img
              alt="Аватар пользователя"
              src={userAvatar}
              className="profile__avatar"
            />
          </a>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__button-edit"
            />
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button-add" />
      </section>
      <section>
        <ul className="elements">
          {cards.map(card => (
            <Card
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