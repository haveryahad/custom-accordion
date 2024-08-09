import logo from "../logo.svg";
const Header = () => {
  return (
    <header className="flex justify-between shadow-md items-center px-8">
      <div>
        <img
          src={logo}
          alt="React Logo"
          className="w-32 h-32 transition-all duration-1000 hover:rotate-180"
        />
      </div>
    </header>
  );
};

export default Header;
