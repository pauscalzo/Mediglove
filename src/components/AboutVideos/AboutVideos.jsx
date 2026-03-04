import React from 'react';
import styles from './AboutVideos.module.css';
import { getImageUrl } from '../../utils/imageHelper';
import { FaPlay } from 'react-icons/fa';

const AboutVideos = () => {
  const videos = [
    {
      id: 1,
      title: 'Video Institucional',
      image: 'video-quienessomos-01.png',
      videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Nuestras Instalaciones',
      image: 'video-quienessomos-02.png',
      videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  return (
    <section className={styles.videosSection}>
      <h2 className={styles.sectionTitle}>Videos institucionales</h2>
      <div className={styles.videosContainer}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoCard}>
            <a
              href={video.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoLink}
            >
              <img
                src={getImageUrl(`img/${video.image}`)}
                alt={video.title}
                className={styles.videoCover}
              />
              <div className={styles.playOverlay}>
                <div className={styles.playButton}>
                  <FaPlay size={28} />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutVideos;
