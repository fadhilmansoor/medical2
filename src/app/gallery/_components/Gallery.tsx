"use client";

import { useState, useEffect } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Image from "next/image";

// Gallery categories
const categories = ["All", "Treatments", "Facilities", "Team", "Events"];

// Dummy gallery data
const galleryImages = [
  {
    id: 1,
    category: "Treatments",
    image: "/assets/images/gallery/pic1.jpg",
    title: "Advanced Dermatology Treatment",
    description: "State-of-the-art skin care procedures"
  },
  {
    id: 2,
    category: "Facilities",
    image: "/assets/images/gallery/pic2.jpg",
    title: "Modern Treatment Room",
    description: "Equipped with latest medical technology"
  },
  {
    id: 3,
    category: "Team",
    image: "/assets/images/gallery/pic3.jpg",
    title: "Expert Medical Team",
    description: "Experienced healthcare professionals"
  },
  {
    id: 4,
    category: "Treatments",
    image: "/assets/images/gallery/pic4.jpg",
    title: "Laser Therapy Session",
    description: "Advanced laser treatment technology"
  },
  {
    id: 5,
    category: "Events",
    image: "/assets/images/gallery/pic5.jpg",
    title: "Health Awareness Campaign",
    description: "Community health initiative"
  },
  {
    id: 6,
    category: "Facilities",
    image: "/assets/images/gallery/pic6.jpg",
    title: "Reception & Waiting Area",
    description: "Comfortable patient waiting space"
  },
  {
    id: 7,
    category: "Treatments",
    image: "/assets/images/gallery/pic7.jpg",
    title: "Physiotherapy Session",
    description: "Rehabilitation and recovery programs"
  },
  {
    id: 8,
    category: "Team",
    image: "/assets/images/gallery/pic8.jpg",
    title: "Nursing Staff",
    description: "Dedicated nursing care team"
  },
  {
    id: 9,
    category: "Events",
    image: "/assets/images/gallery/pic9.jpg",
    title: "Medical Workshop",
    description: "Continuous professional development"
  },
  {
    id: 10,
    category: "Facilities",
    image: "/assets/images/gallery/pic10.jpg",
    title: "Surgery Suite",
    description: "Fully equipped operating theater"
  },
  {
    id: 11,
    category: "Treatments",
    image: "/assets/images/gallery/pic11.jpg",
    title: "Dental Care",
    description: "Comprehensive dental services"
  },
  {
    id: 12,
    category: "Events",
    image: "/assets/images/gallery/pic12.jpg",
    title: "Annual Health Fair",
    description: "Community wellness event"
  },
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  return (
    <>

      <main className="page-content premium-gallery">
        <PageBanner title="Our Gallery" bnrimage={IMAGES.bnr2.src} />

        <section className="content-inner gallery-content">
          <div className="container">
            {/* Gallery Header */}
            <div className={`gallery-header ${isLoaded ? 'loaded' : ''}`}>
              <span className="gallery-subtitle">Explore Our World</span>
              <h1 className="gallery-main-title">Visual Journey</h1>
              <p className="gallery-intro">
                Discover excellence through our carefully curated collection of moments, 
                facilities, and the dedicated team behind our success.
              </p>
            </div>

            {/* Category Filter */}
            <div className="gallery-filter-section">
              <div className="category-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    <span className="filter-text">{category}</span>
                    <span className="filter-line"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="gallery-grid">
              {filteredImages.map((item, index) => (
                <div 
                  key={item.id} 
                  className="gallery-item"
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onClick={() => openLightbox(item.id)}
                >
                  <div className="gallery-card">
                    <div className="card-image-container">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={450}
                        className="gallery-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                    
                    <div className="card-details">
                      <div className="card-header">
                        <span className="card-category">{item.category}</span>
                        <div className="expand-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </div>
                      </div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Lightbox */}
        {selectedImage && selectedImageData && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-backdrop"></div>
            
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="lightbox-wrapper" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox-nav nav-prev" 
                onClick={() => navigateLightbox("prev")}
                aria-label="Previous image"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <div className="lightbox-content">
                <div className="lightbox-image-box">
                  <Image
                    src={selectedImageData.image}
                    alt={selectedImageData.title}
                    width={1600}
                    height={1000}
                    className="lightbox-image"
                    priority
                  />
                </div>
                
                <div className="lightbox-meta">
                  <div className="meta-content">
                    <span className="meta-category">{selectedImageData.category}</span>
                    <h2 className="meta-title">{selectedImageData.title}</h2>
                    <p className="meta-description">{selectedImageData.description}</p>
                  </div>
                  <div className="meta-counter">
                    <span className="counter-current">
                      {String(filteredImages.findIndex(img => img.id === selectedImage) + 1).padStart(2, '0')}
                    </span>
                    <span className="counter-divider">/</span>
                    <span className="counter-total">
                      {String(filteredImages.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                className="lightbox-nav nav-next" 
                onClick={() => navigateLightbox("next")}
                aria-label="Next image"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

    
    </>
  );
}

export default GalleryPage;