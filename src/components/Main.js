import avatar from '../images/avatar.jpg';

function Main() {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <a target="_self" href="#" className="profile__cover">
            <img alt="Аватарка" src={avatar} className="profile__avatar" />
          </a>
          <div className="profile__info">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button type="button" className="profile__button-edit" />
            <p className="profile__status">Исследователь океана</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" />
      </section>
      <section>
        <ul className="elements" />
      </section>
    </main>
  );
} 

export default Main;