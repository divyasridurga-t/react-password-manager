import React from "react";

export default function Navbar(){
    return (
      <>
        <nav className="bg-purple-300 flex justify-between items-center px-4 h-[60px]">
          <div className="logo font-bold">Password Manager</div>
          <ul className="flex">
            <li className="pr-4">
              <a>Home</a>
            </li>
            <li className="pr-4">
              <a>About</a>
            </li>
            <li className="pr-4">
              <a>Contact</a>
            </li>
          </ul>
        </nav>
      </>
    );
}