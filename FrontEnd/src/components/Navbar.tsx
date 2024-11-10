import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgLogo from "../assets/img/chatter_logo.png";

export default function Navbar({onClick}) {
  return (
    <div>
      <header>
        <nav className="hidden max-lg:flex max-lg:justify-between max-lg:px-4 py-3 max-lg:border-b max-lg:border-gray-600 items-center">
          <div className="">
            <img src={imgLogo} className="w-20" alt="" />
          </div>
          <div className="max-lg:flex gap-3">
            <div className="text-gray-200">
              <button className="border-gray-400 border px-5 py-1 rounded-md hover:border-gray-100 hover:text-white">
                <i className="fa-solid fa-magnifying-glass "></i>
              </button>
            </div>
            <div className=" text-gray-200 max-lg:hidden max-md:flex">
              <button onClick={onClick} className="border border-gray-400 px-4 py-1 rounded-md hover:border-gray-100 hover:text-white">New Post</button>
            </div>
            <div className="border w-9 rounded-md">

            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
