import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHospital, 
  FaUserMd, 
  FaMicroscope, 
  FaPills, 
  FaRunning, 
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 30px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    height: 400px;
    margin: 1rem 0;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${props => props.bgImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(5px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SlideContent = styled.div`
  max-width: 800px;
  z-index: 2;
`;

const SlideIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, ${props => props.color1}, ${props => props.color2});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 48px;
  color: white;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 8px rgba(255, 255, 255, 0.1);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 32px;
    margin-bottom: 1.5rem;
  }
`;

const SlideTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SlideDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 1rem;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 2rem;
  }

  &.next {
    right: 2rem;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;

    &.prev {
      left: 1rem;
    }

    &.next {
      right: 1rem;
    }
  }
`;

const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: <FaHospital />,
      title: "Emergency Care",
      description: "24/7 emergency services with state-of-the-art facilities and experienced medical professionals ready to provide immediate care when you need it most.",
      bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#4CAF50",
      color2: "#45a049"
    },
    {
      icon: <FaUserMd />,
      title: "Expert Medical Staff",
      description: "Our team of board-certified physicians, specialists, and healthcare professionals are dedicated to providing the highest quality of patient care.",
      bgImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#2196F3",
      color2: "#1976D2"
    },
    {
      icon: <FaMicroscope />,
      title: "Advanced Diagnostics",
      description: "Cutting-edge diagnostic equipment and laboratory services to ensure accurate and timely medical assessments for better treatment outcomes.",
      bgImage: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#9C27B0",
      color2: "#7B1FA2"
    },
    {
      icon: <FaPills />,
      title: "Pharmacy Services",
      description: "On-site pharmacy with comprehensive medication management, prescription services, and pharmaceutical counseling for your convenience.",
      bgImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#FF9800",
      color2: "#F57C00"
    },
    {
      icon: <FaRunning />,
      title: "Rehabilitation",
      description: "Physical therapy, occupational therapy, and rehabilitation services to help patients recover and regain their independence after illness or injury.",
      bgImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#F44336",
      color2: "#D32F2F"
    },
    {
      icon: <FaMobileAlt />,
      title: "Digital Health",
      description: "Modern patient portal system for easy access to medical records, appointment scheduling, and communication with healthcare providers.",
      bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color1: "#009688",
      color2: "#00796B"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [features.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  return (
    <CarouselContainer>
      <SlideContainer>
        <AnimatePresence mode="wait">
          <Slide
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            bgImage={features[currentSlide].bgImage}
          >
            <SlideContent>
              <SlideIcon 
                color1={features[currentSlide].color1}
                color2={features[currentSlide].color2}
              >
                {features[currentSlide].icon}
              </SlideIcon>
              <SlideTitle>{features[currentSlide].title}</SlideTitle>
              <SlideDescription>{features[currentSlide].description}</SlideDescription>
            </SlideContent>
          </Slide>
        </AnimatePresence>
      </SlideContainer>

      <NavButton className="prev" onClick={goToPrevious}>
        <FaChevronLeft />
      </NavButton>
      <NavButton className="next" onClick={goToNext}>
        <FaChevronRight />
      </NavButton>

      <NavigationDots>
        {features.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </NavigationDots>
    </CarouselContainer>
  );
};

export default FeatureCarousel;
