import './App.css';
import NavBar from './components/NavBar/NavBar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HeroTitle from './components/HeroTitle/HeroTitle';
import ProductSlider from './components/ProductSlider/ProductSlider';
import Brands from './components/Brands/Brands';
import BannerHome from './components/BannerHome/BannerHome';
import WholesaleSection from './components/WholesaleSection/WholesaleSection';
import InfoCardsMagicBento from "./components/InfoCardsMagicBento/InfoCardsMagicBento";
import DownloadCatalog from './components/DownloadCatalog/DownloadCatalog';
import Footer from './components/Footer/Footer';
import DarkVeil from './components/DarkVeil/DarkVeil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';

const getBasename = () => {
  // Only use basename in production
  if (process.env.NODE_ENV === 'production') {
    return '/WEB/Mediglove';
  }
  return '/';
};

function App() {
  // Modal displacement effect
  useEffect(() => {
    const modalOpen = document.body.classList.contains('modal-open');
    if (modalOpen) {
      document.body.style.transition = 'padding-top 0.5s cubic-bezier(.5,1.5,.5,1)';
      document.body.style.paddingTop = '220px';
    } else {
      document.body.style.transition = 'padding-top 0.5s cubic-bezier(.5,1.5,.5,1)';
      document.body.style.paddingTop = '0px';
    }
    return () => {
      document.body.style.transition = '';
      document.body.style.paddingTop = '';
    };
  });

  return (
    <Router basename={getBasename()}>
      <ScrollToTop />
      <div className="App" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <NavBar />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route path="/producto/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
        <DarkVeil
          hueShift={46}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={1.4}
          scanlineFrequency={0.5}
          warpAmount={0}
          width={1000}
          height={450}
        />
      </div>
    </Router>
  );
}

export default App;
