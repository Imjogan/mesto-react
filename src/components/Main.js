import React from 'react';
import api from '../utils/Api';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // получаем данные о пользователе и карточках
    api.getInitialData()
    .then(data => {
      const [initialCardsData, initialUserData] = data;
      setUserAvatar(initialUserData.avatar);
      setUserName(initialUserData.name);
      setUserDescription(initialUserData.about);

      initialCardsData.forEach(card => {
        setCards(cards => [...cards, card]);
      });
      
    }).catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <a onClick={props.onEditAvatar} target="_self" href="#" className="profile__cover">
            <img alt="Аватарка" src={userAvatar} className="profile__avatar" />
          </a>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__button-edit" />
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__button-add" />
      </section>
      <section>
        <ul className="elements">
          {cards.map(card => (
            <li key={card._id} className="element">
              <button type="button" className="element__trash-button" />
              <img src={card.link} alt="Фотография" className="element__image" />
              <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                  <button type="button" className="element__like" />
                  <h3 className="element__like-counter">{card.likes.length}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul> 
      </section>
    </main>
  );
} 

export default Main;