import React from "react";

const Nav = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:top-0 lg:bg-transparent overflow-hidden">
      <div>{children}</div>
    </div>
  );
};

export default Nav;
