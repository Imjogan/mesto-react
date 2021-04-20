function Image() {

  return (
    <img
      onClick={onClick}
      src={isLoadError ? filler : src}
      alt={`Фото: ${alt}`}
      className={className}
      onError={handleLoadError}
    />
  );
}

export default Image;