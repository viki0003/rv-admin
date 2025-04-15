import AdminLogo from "../../Assets/Images/RVLogo.png";
import './header.css';
const Header = () => {
  return (
    <header>
      <div className="header">
        <img src={AdminLogo} alt="logo" width={200} />
      </div>
    </header>
  );
};
export default Header;
