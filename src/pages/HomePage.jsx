
import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import img1 from '../assets/styles/imgs/icones/icon2.jpg'
import img2 from '../assets/styles/imgs/icones/girl2.jpg'
import img3 from '../assets/styles/imgs/icones/robot3.jpg'
import homepageDec from '../assets/styles/imgs/homepage/dec-homepage.png'

export function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    { id: 1, url: img1, alt: '1' },
    { id: 2, url: img2, alt: '2' },
    { id: 3, url: img3, alt: '3' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  const getImageIndex = (index) => {
    return (index + images.length) % images.length
  }

  return (
    <div className="home-page">
      <img  className="homepage-dec" src={homepageDec} alt="" />
      <h1>Manage your Wallet</h1>
      
      <div className="gallery-container">
        <div className="gallery">
          {[-1, 0, 1].map((offset) => {
            const index = getImageIndex(currentIndex + offset)
            return (
              <div 
                key={images[index].id} 
                className={`main-imgs ${offset === 0 ? 'center' : ''}`}
              >
                <img src={images[index].url} alt={images[index].alt} />
              </div>
            )
          })}
        </div>
      </div>
      <div>
      <button className="create-wallet-btn">
        Create new wallet
        <ChevronRight />
      </button>  
      <a href="#" className="existing-wallet-link">
        I already have a wallet
      </a>

      </div>
    </div>
  )
}

