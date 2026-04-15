import React, { useState } from 'react';
import styles from './AccordionSection.module.css';
import { IoChevronDown } from 'react-icons/io5';

export default function AccordionSection({ items = [], layout = 'vertical' }) {
  const [expandedId, setExpandedId] = useState(0);

  const toggleItem = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={`${styles.accordionItem} ${expandedId === (item.id || index) ? styles.expanded : ''}`}
        >
          <button
            className={styles.accordionButton}
            onClick={() => toggleItem(item.id || index)}
            aria-expanded={expandedId === (item.id || index)}
          >
            <div className={styles.accordionTitle}>
              <h3 className={styles.titleText}>{item.title}</h3>
              <div className={styles.chevron}>
                <IoChevronDown size={24} />
              </div>
            </div>
          </button>
          
          {expandedId === (item.id || index) && (
            <div className={styles.accordionContent}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
