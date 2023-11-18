import React, { useState } from 'react';
import './PhotoGallery.css'; // Importar o arquivo CSS

const PhotoGallery = ({ photos }) => {
  const [modalPhoto, setModalPhoto] = useState(null);

  const openModal = (photo) => {
    setModalPhoto(photo);
  };

  const closeModal = () => {
    setModalPhoto(null);
  };

  return (
    <div>
      <div className="gallery">
        {photos.map(photo => (
          <img 
            key={photo} 
            src={photo} 
            alt="Gallery" 
            onClick={() => openModal(photo)} 
            className="gallery-img" 
          />
        ))}
      </div>

      {modalPhoto && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img src={modalPhoto} alt="Expanded" className="modal-content" />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
