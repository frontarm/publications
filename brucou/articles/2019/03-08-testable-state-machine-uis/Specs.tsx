import React from 'react'
import { Doc } from '@frontarm/doc'
import styles from './Specs.module.scss'

/**
 * Arranges its images in a "gallery" of captioned images, videos, etc.
 * 
 * Collapses the number of columns on smaller screens.
 */
export function Specs({ specs }) {
  return (
    <div className={styles.Specs}>
      <Doc.Gutter horizontal>
        <Doc.Escape>
          <ol>
            {
              specs.map(([src, spec], i) =>
                <li>
                  <figure key={i}>
                    <span className={styles.number} aria-hidden>{i+1}.</span>
                    <div className={styles.image}>
                      <img src={src} alt='Screenshot of app' />
                    </div>
                    <figcaption>
                      <pre>
                        {spec}
                      </pre>
                    </figcaption>
                  </figure>
                </li>
              )
            }
          </ol>
        </Doc.Escape>
      </Doc.Gutter>
    </div>
  )
}
