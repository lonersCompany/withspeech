import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
  return (
    <div className="bg-gray-800 hidden fixed inset-0 pt-16 h-full z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5">
      <div className="h-screen overflow-y-auto scrolling-touch lg:flex lg:flex-col lg:h-screen lg:block lg:relative lg:sticky lg:top-0 lg:bg-transparent overflow-hidden">
        <div className="px-2 py-1">
          <Link
            to="/dashboard"
            className="block px-6 py-5 rounded w-full font-semibold text-xl hover:bg-green-500"
          >
            Wave Page{"  "}
            <span role="img" aria-label="" description="wave hand">
              🌀
            </span>
          </Link>
        </div>

        <div className="flex-grow">{children}</div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Sidebar;
