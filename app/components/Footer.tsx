import React from 'react';
import { Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 NIKE Shoes All rights reserved</p>
      <p className="icons">
        <Instagram />
        <Twitter />
      </p>
    </div>
  );
};

export default Footer;
