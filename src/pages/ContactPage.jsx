import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import styles from './ContactPage.module.css';
import { getImageUrl } from '../utils/imageHelper';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: '',
      cuiEmpresa: '',
      email: '',
      tel: '',
      domicilio: '',
      mensaje: ''
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
        nombre: data.nombre,
        cuiEmpresa: data.cuiEmpresa,
        email: data.email,
        tel: data.tel,
        domicilio: data.domicilio,
        mensaje: data.mensaje
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
        <div className={styles.headerImage}>
          <img src={getImageUrl('./img/contacto.png')} alt="Contacto" />
        </div>
        <p className={styles.description}>
          Nuestro equipo de profesionales aguarda tu contacto para poder brindarte información y soluciones a tu medida. No dudes en contactarnos.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>Nombre*</label>
            <input
              id="nombre"
              type="text"
              placeholder=""
              className={styles.input}
              {...register('nombre', { required: 'El nombre es requerido' })}
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cuiEmpresa" className={styles.label}>CUI y Nombre de la empresa*</label>
            <input
              id="cuiEmpresa"
              type="text"
              placeholder=""
              className={styles.input}
              {...register('cuiEmpresa', { required: 'CUI y nombre de empresa es requerido' })}
            />
            {errors.cuiEmpresa && <span className={styles.error}>{errors.cuiEmpresa.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email*</label>
            <input
              id="email"
              type="email"
              placeholder=""
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
            <label htmlFor="tel" className={styles.label}>Tel*</label>
            <input
              id="tel"
              type="tel"
              placeholder=""
              className={styles.input}
              {...register('tel', { required: 'Teléfono es requerido' })}
            />
            {errors.tel && <span className={styles.error}>{errors.tel.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="domicilio" className={styles.label}>Domicilio (calle / Nº / Ciudad / CP / país)*</label>
            <input
              id="domicilio"
              type="text"
              placeholder=""
              className={styles.input}
              {...register('domicilio', { required: 'Domicilio es requerido' })}
            />
            {errors.domicilio && <span className={styles.error}>{errors.domicilio.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mensaje" className={styles.label}>Mensaje*</label>
            <textarea
              id="mensaje"
              placeholder=""
              className={styles.textarea}
              rows="6"
              {...register('mensaje', { required: 'El mensaje es requerido' })}
            />
            {errors.mensaje && <span className={styles.error}>{errors.mensaje.message}</span>}
          </div>
        </div>

        {submitMessage && <div className={styles.successMessage}>{submitMessage}</div>}
        {submitError && <div className={styles.errorMessage}>{submitError}</div>}

        <p className={styles.requiredNote}>*Todos los campos son obligatorios</p>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
