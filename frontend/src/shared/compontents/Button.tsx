'use client'

import Image from 'next/image'
import styles from './Button.module.scss'
import React, { CSSProperties, useState } from 'react'

type Props = {
  type: 'submit' | 'button',
  variation?: 'second' | 'three' | 'four' | 'five',
  text: string | React.ReactNode,
  onClick?: any,
  style?: CSSProperties,
  heart?: boolean,
  hoverChild?: React.ReactNode,
}

const Button: React.FC<Props> = ({ variation, style, text, onClick, heart = true, hoverChild }) => {
  const [isHover, setHover] = useState(false)

  const variationClassMap: Record<string, string> = {
    second: styles['button-sec'],
    three: styles['button-three'],
    four: styles['button-four'], 
    five: styles['button-five'], 
  }

  const buttonClass = variation ? variationClassMap[variation] || styles['button'] : styles['button']

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={buttonClass}
    > 


      {
        (hoverChild && isHover) ? <>
          {hoverChild}
        </>
        :
        text
      }

        {
            variation !== 'four' && heart && <>

            { variation !== 'three' ? (
                    isHover ? (
                      <>
                        {
                            hoverChild === undefined &&
                            <Image
                                className={styles['button__image']}
                                src="/images/main-hero/heart.png"
                                alt="heart"
                                width={38}
                                height={38}
                            />
                        }
                      </>
                    ) : (
                    <Image
                        className={styles['button__image']}
                        src="/images/main-hero/heart4.png"
                        alt="heart"
                        width={22}
                        height={22}
                    />
                    )
                ) : (
                    <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z"
                        stroke="white"
                        strokeWidth="1.66667"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.94995 12.9416L11.8833 9.99996L8.94995 7.05829"
                        stroke="white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                )}
            </> 
        }

    </button>
  )
}

export default Button
