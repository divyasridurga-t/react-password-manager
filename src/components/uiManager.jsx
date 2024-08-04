import React, { useEffect, useState } from "react";
import { useRef } from "react";

export default function UIManager() {
  let [img, setImage] = useState("eyescross");
  let [type, setType] = useState("password");
  let [form, setForm] = useState({ website: "", username: "", password: "" });
  let [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  function handleClick() {
    setImage(img == "eyescross" ? "eyes" : "eyescross");
    setType(type == "password" ? "text" : "password");
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log(passwordArray);
  };

  const copyText=(text)=>{
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      {/* input fields */}
      <div className="w-3/4 h-full mx-auto pb-3">
        <div className="font-bold text-4xl flex justify-center pt-4">
          <div>
            <span className="text-purple-700"> &lt;</span>
            Pass
            <span className="text-purple-700">OP/&gt;</span>
          </div>
        </div>
        <div className="text-center text-lg">Your own password manager.</div>
        <div className=" flex flex-col mt-4 px-4">
          <input
            value={form.website}
            onChange={handleChange}
            placeholder="Enter website url"
            name="website"
            className="w-full rounded-full border border-purple-700 h-8 px-2"
            type="text"
          />
          <div className="mt-2 flex gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              name="username"
              type="text"
              className="w-1/2 rounded-full border border-purple-700 h-8 px-2"
            />
            <input
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              name="password"
              type={type}
              className="w-1/2 rounded-full border border-purple-700 h-8 px-2"
            />
            <span className="absolute right-[15%] mt-[6px] cursor-pointer">
              <img
                onClick={handleClick}
                width={20}
                height={25}
                src={`images/${img}.png`}
              />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={savePassword}
            className="flex gap-1 items-center w-auto p-2 text-center.5 bg-purple-500 mt-5 rounded-full text-white font-semibold hover:bg-purple-700 shadow-lg shadow-purple-500/50"
          >
            <span className="text-2xl">+ </span>
            <span>Add Password</span>
          </button>
        </div>
        {/* display fields */}
        <div className="font-bold text-lg my-3">Your Passwords :</div>
        {passwordArray.length ? (
          <table className="table-auto w-full">
            <thead className="bg-purple-400">
              <tr>
                <th className="p-2 text-center">Website</th>
                <th className="p-2 text-center">Username</th>
                <th className="p-2 text-center">Password</th>
              </tr>
            </thead>
            <tbody className="bg-purple-200">
              {passwordArray.length
                ? passwordArray.map((item, index) => {
                    let { website = "", username = "", password = "" } = item;
                    return (
                      <>
                        <tr key={index} className="border border-white">
                          <td className="text-center p-2">
                            <div className="flex justify-center items-center">
                              <a href={website} target="_blank">
                                {website}
                              </a>
                              <div className="cursor-pointer">
                                <img width={18} src="/images/copy.png" onClick={()=>{copyText(website)}} />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2">
                            <div className="flex justify-center items-center">
                              <span>{username}</span>
                              <div className="cursor-pointer">
                                <img width={18} src="/images/copy.png" onClick={()=>{copyText(username)}}/>
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2">
                            <div className="flex justify-center items-center">
                              <span>{password}</span>
                              <div className="cursor-pointer">
                                <img width={18} src="/images/copy.png" onClick={()=>{copyText(password)}}/>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })
                : ""}
            </tbody>
          </table>
        ) : (
          <h2 className="font-semibold text-lg my-3">
            You didn't save any passwords yet
          </h2>
        )}
      </div>
    </>
  );
}
