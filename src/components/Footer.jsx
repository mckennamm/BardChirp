import './Footer.css'; 

// src/components/Footer.jsx
import dnd from '../assets/dnd.png';

function Footer() {
  return (
    <footer>
      <p>Click on the logo to learn more about Dungeons and Dragons.</p>
      <a
        href="https://www.dndbeyond.com/?srsltid=AfmBOoppvykMAKQQW6cxw1CeEEMNvm9i9eA0wc3USJm3lgl7qnSx6Emd"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={dnd} className="logo dnd" alt="DnD logo" />
      </a>
    </footer>
  );
}

export default Footer;
