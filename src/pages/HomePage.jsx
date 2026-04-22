import React from 'react';
import HeroTitle from '../components/HeroTitle/HeroTitle';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import Brands from '../components/Brands/Brands';
import BannerHome from '../components/BannerHome/BannerHome';
import WholesaleSection from '../components/WholesaleSection/WholesaleSection';
import InfoCardsMagicBento from '../components/InfoCardsMagicBento/InfoCardsMagicBento';
import DownloadCatalog from '../components/DownloadCatalog/DownloadCatalog';

export default function HomePage() {
  return (
    <>
      <HeroTitle />
      <ProductSlider />
      <Brands />
      <BannerHome />
      <WholesaleSection />
      <InfoCardsMagicBento glowColor="126, 194, 192" />
      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <DownloadCatalog onClick={() => window.open(`${process.env.PUBLIC_URL}/img/catalogo-triptico-web.pdf`, '_blank')} />
      </div>
    </>
  );
}
