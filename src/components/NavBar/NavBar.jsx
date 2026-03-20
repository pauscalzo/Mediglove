import styles from './NavBar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ClickSpark from '../ClickSpark/ClickSpark';
import { useState, useEffect } from 'react';
import ProductCards from '../ProductCards/ProductCards';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageHelper';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';

const MOBILE_BREAKPOINT = 992;

const productCategories = [
  { label: 'LATEX FREE', link: '/categoria/nitrilo' },
  { label: 'ESTERIL', link: '/categoria/esteriles' },
  { label: 'DOMESTICOS', link: '/categoria/domesticos' },
  { label: 'PE', link: '/categoria/pe' },
  { label: 'VINILO', link: '/categoria/vinilo' },
  { label: 'NATURAL LATEX', link: '/categoria/natural-latex' }
];

function NavBar() {
  const [showProductNav, setShowProductNav] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const location = useLocation();

  // Determine active link based on current location
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add/remove modal-open class to body for displacement
  useEffect(() => {
    if (showProductNav || closing) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showProductNav, closing]);

  // Menu items for mobile
  const mobileMenuItems = [
    { label: 'Home', link: '/' },
    {
      label: 'Productos',
      subitems: productCategories
    },
    { label: 'Quienes Somos', link: '/quienes-somos' },
    { label: 'Asesoramiento', link: '/asesoramiento' },
    { label: 'Contacto', link: '#contact' }
  ];

  return (
    <>
      {isMobile ? (
        <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '100vw', zIndex: 40, pointerEvents: 'none' }}>
          <StaggeredMenu
            position="right"
            items={mobileMenuItems}
            displaySocials={false}
            displayItemNumbering={false}
            logoUrl={getImageUrl('./img/logo.png')}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen={false}
            colors={['#78BAB9', '#5227FF']}
            accentColor="#78BAB9"
          />
        </div>
      ) : (
        <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
          <Container className={styles.container}>
            <Link to="/" className={styles.brand} style={{ textDecoration: 'none' }}>
              <img className={styles.logo} src={getImageUrl('./img/logo.png')} alt="MediGlove" />
            </Link>
            <Navbar.Toggle aria-controls="primary-navbar" className={styles.toggle} />
            <Navbar.Collapse id="primary-navbar" className={styles.collapse}>
              <div className={styles.menuRight}>
                <ClickSpark>
                  <Button className={styles.cta} type="button"
                    onClick={() => {
                      if (showProductNav) {
                        setClosing(true);
                        setTimeout(() => {
                          setShowProductNav(false);
                          setClosing(false);
                        }, 600);
                      } else {
                        setShowProductNav(true);
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Productos {showProductNav ? <FaTimes /> : <FaChevronDown />}
                  </Button>
                </ClickSpark>
                <Nav className={styles.linkGroup}>
                  <ClickSpark>
                    <Nav.Link className={`${styles.link} ${isActive('/') ? styles.active : ''}`} href="/" as={Link} to="/">Home</Nav.Link>
                  </ClickSpark>
                  <ClickSpark>
                    <Nav.Link className={`${styles.link} ${isActive('/quienes-somos') ? styles.active : ''}`} href="/quienes-somos" as={Link} to="/quienes-somos" style={{ whiteSpace: 'nowrap' }}>Quienes Somos</Nav.Link>
                  </ClickSpark>
                  <ClickSpark>
                    <Nav.Link className={`${styles.link} ${isActive('/asesoramiento') ? styles.active : ''}`} href="/asesoramiento" as={Link} to="/asesoramiento">Asesoramiento</Nav.Link>
                  </ClickSpark>
                  <ClickSpark>
                    <Nav.Link className={styles.link} href="#contact">Contacto</Nav.Link>
                  </ClickSpark>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      {(showProductNav || closing) && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100 }}
          onClick={() => {
            if (showProductNav) {
              setClosing(true);
              setTimeout(() => {
                setShowProductNav(false);
                setClosing(false);
              }, 600);
            }
          }}
        >
          <div
            style={{ position: 'absolute', top: '80px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}
          >
            <div style={{ pointerEvents: 'auto' }}>
              <ProductCards
                animate={showProductNav && !closing}
                closing={closing}
                onClose={() => {
                  setClosing(true);
                  setTimeout(() => {
                    setShowProductNav(false);
                    setClosing(false);
                  }, 600);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
