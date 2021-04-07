// портируем для хуков
import React from 'react';
// портируем необходимые компоненты
import api from '../utils/api';
import Card from './Card';

// компонент Main содержимого
function Main(props) {

  // создаем state переменные для даных пользователя
  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  // создаем state переменную для карточек
  const [cards, setCards] = React.useState([]);

  // загружаем данные пользователя и карточек
  React.useEffect(() => {
    // получаем данные о пользователе и карточках
    api.getInitialData()
    .then(data => {
      // деструктуризация данных для удобства
      const [initialCardsData, initialUserData] = data;
      // запускаем сеттеры с информацией
      setUserAvatar(initialUserData.avatar);
      setUserName(initialUserData.name);
      setUserDescription(initialUserData.about);
      // сеттер с массивом карточек
      setCards(initialCardsData);
    }).catch(error => {
      console.log(error);
    })
    // зависимостей нет, запускаем один раз при загрузке страницы
  }, []);

  // разметка
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
          {cards.map(element => (
            // создаем компонент Card для каждого элемента state переменной
            // задаем каждому экземпляру компонента уникальный ключ
            <Card cardTransfer={props.onCardClick} key={element._id} card={element} />
          ))}
        </ul> 
      </section>
    </main>
  );
} 

export default Main;