import React from 'react';
import './Footer.css'; // Importando o arquivo CSS

const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
  </footer>
);

export default Footer;