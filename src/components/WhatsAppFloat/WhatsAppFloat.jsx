import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppFloat.module.css';

export default function WhatsAppFloat() {
  const handleWhatsApp = () => {
    // Reemplazar con el número real del cliente cuando tengas
    const phoneNumber = '541131990590';
    const message = 'Hola, estoy interesado en obtener más información sobre Mediglove.';
    
    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.log('Número de WhatsApp no configurado');
    }
  };

  return (
    <button 
      className={styles.whatsappButton}
      onClick={handleWhatsApp}
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
}
