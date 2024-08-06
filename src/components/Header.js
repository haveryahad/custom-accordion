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
      <nav className="flex">
        <div className="px-6 py-2 cursor-pointer transition-all duration-200 border-b-2 border-transparent hover:border-blue-400">
          Home
        </div>
        <div className="px-6 py-2 cursor-pointer transition-all duration-200 border-b-2 border-transparent hover:border-blue-400">
          About
        </div>
      </nav>
    </header>
  );
};

export default Header;
