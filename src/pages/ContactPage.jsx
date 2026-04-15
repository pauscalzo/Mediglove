import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import styles from './ContactPage.module.css';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import Brands from '../components/Brands/Brands';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import DownloadCatalog from '../components/DownloadCatalog/DownloadCatalog';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // Inicializar EmailJS
      emailjs.init('VJHkzhhmuQfeim4Wp');

      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message
      };

      // Enviar email
      await emailjs.send(
        'service_0lt259j',
        'template_p9pwwus',
        templateParams
      );

      setSubmitMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('Error al enviar el mensaje. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Queremos que nos contactes</h1>
        <p className={styles.description}>
          Nuestro equipo de profesionales aguarda tu contacto para poder brindarte información y soluciones a tu medida. No dudes en contactarnos.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>Nombre*</label>
            <input
              id="firstName"
              type="text"
              placeholder="Tu nombre"
              className={styles.input}
              {...register('firstName', { required: 'El nombre es requerido' })}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>Apellido*</label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              className={styles.input}
              {...register('lastName', { required: 'El apellido es requerido' })}
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email*</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className={styles.input}
              {...register('email', { 
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Teléfono*</label>
            <input
              id="phone"
              type="tel"
              placeholder="Tu teléfono"
              className={styles.input}
              {...register('phone', { required: 'El teléfono es requerido' })}
            />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.label}>Empresa</label>
            <input
              id="company"
              type="text"
              placeholder="Tu empresa (opcional)"
              className={styles.input}
              {...register('company')}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Mensaje*</label>
            <textarea
              id="message"
              placeholder="Tu mensaje..."
              className={styles.textarea}
              rows="6"
              {...register('message', { required: 'El mensaje es requerido' })}
            />
            {errors.message && <span className={styles.error}>{errors.message.message}</span>}
          </div>
        </div>

        {submitMessage && <div className={styles.successMessage}>{submitMessage}</div>}
        {submitError && <div className={styles.errorMessage}>{submitError}</div>}

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>

      <ProductSlider />
      <Brands />
      <InfoCardsMagicBento glowColor="126, 194, 192" />
      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <DownloadCatalog onClick={() => window.open('/catalogo.pdf', '_blank')} />
      </div>
    </div>
  );
}
