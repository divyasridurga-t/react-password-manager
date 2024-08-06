import React from "react";

export default function Navbar(){
    return (
      <>
        <nav className="bg-purple-300 flex justify-between items-center  h-[60px] sm:px-0 xl:px-44">
          <div className="logo font-bold text-2xl">
            <span className="text-purple-700"> &lt;</span>
            Pass
            <span className="text-purple-700">OP/&gt;</span>
          </div>
          
          <div>
            <button className="flex gap-1 bg-purple-500 font-bold rounded-full p-2 shadow-lg text-white hover:bg-purple-700"><img src="/images/github.png" /><span>GitHub</span></button>
          </div>
        </nav>
      </>
    );
}