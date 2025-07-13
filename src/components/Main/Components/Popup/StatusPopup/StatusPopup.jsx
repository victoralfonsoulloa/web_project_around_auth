import React from 'react';

export default function StatusPopup({ image, title}) {
  return (
    <div className="status-popup">
      <img src={image} alt={title} className="status-popup__image" />
      <h2 className="status-popup__title">{title}</h2>
    </div>
  );
}
