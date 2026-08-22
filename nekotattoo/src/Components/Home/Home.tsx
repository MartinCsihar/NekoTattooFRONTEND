import React from 'react'
import DesktopHome from './DesktopHome';
import MobileHome from './MobileHome';

const Home = () => {
  const isMobile = window.innerWidth <= 768;
  
  return isMobile ? <MobileHome/> : <DesktopHome/>
}

export default Home