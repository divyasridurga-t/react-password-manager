import React from "react";

export default function Navbar(){
    return (
      <>
        <nav className="bg-purple-300 flex justify-between items-center px-44 h-[60px]">
          <div className="logo font-bold text-2xl">
            <span className="text-green-700"> &lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
          </div>
          <ul className="flex font-bold">
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