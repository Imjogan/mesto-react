import { useState } from 'react';
import filler from '../images/filler.jpg';

function Image({ card, onClick, classStyleName }) {

  const [isLoadError, setIsLoadError] = useState(false);

  function handleLoadError() {
    setIsLoadError(true);
  }

  return (
    <img
      onClick={onClick}
      src={card ? (isLoadError ? filler : card.link) : null}
      alt={
        card ? (isLoadError ?
          "Гомер Симпсон передает, что в адресе изображения возникла ошибка" :
          (`На фотографии - ${card.name}`)) :
          ''
      }
      className={classStyleName}
      onError={handleLoadError}
    />
  );
}

export default Image;