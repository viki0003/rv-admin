import './footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="btm-ftr-cstm">
        <div className="copyright-text">© {currentYear} Nationwide RV </div>
      </div>
    </footer>
  );
};

export default Footer;