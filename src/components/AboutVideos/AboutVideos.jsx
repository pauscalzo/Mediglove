import React, { useState } from 'react';
import styles from './AboutVideos.module.css';
import { getImageUrl } from '../../utils/imageHelper';
import { FaPlay } from 'react-icons/fa';

const AboutVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Video Institucional',
      image: 'video-quienessomos-01.png',
      videoId: '72YDDaA4_bk',
      youtubeUrl: 'https://www.youtube.com/watch?v=72YDDaA4_bk'
    },
    {
      id: 2,
      title: 'Nuestras Instalaciones',
      image: 'video-quienessomos-02.png',
      videoId: '1SMXl9GkHG0',
      youtubeUrl: 'https://www.youtube.com/watch?v=1SMXl9GkHG0'
    }
  ];

  return (
    <section className={styles.videosSection}>
      <h2 className={styles.sectionTitle}>Videos institucionales</h2>
      <div className={styles.videosContainer}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoCard}>
            <button
              onClick={() => setSelectedVideo(video)}
              className={styles.videoLink}
              aria-label={`Ver ${video.title}`}
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
            </button>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className={styles.videoModalOverlay} onClick={() => setSelectedVideo(null)}>
          <div className={styles.videoModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedVideo(null)}>✕</button>
            <iframe
              className={styles.videoFrame}
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutVideos;
