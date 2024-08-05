import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

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
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]));
    console.log(passwordArray);
    toast("password added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type:"success"
    });
  };

  const copyText = (text) => {
    toast("copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type:"success"
    });
    navigator.clipboard.writeText(text);
  };

  const deletePassword=(id)=>{
    setPasswordArray(passwordArray.filter((item)=>item.id != id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id != id)));
    toast("password deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type:"error"
    });
  }

  const editPassword=(id)=>{
    setForm(passwordArray.filter((item)=> item.id ===id)[0]);
    setPasswordArray(passwordArray.filter((item)=>item.id != id));
    toast("password edited successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type:'success'
    });
  }

  return (
    <>
      <ToastContainer />
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
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-purple-200">
              {passwordArray.length
                ? passwordArray.map((item, index) => {
                    let { website = "", username = "", password = "", id='' } = item;
                    return (
                      <>
                        <tr key={index} className="border border-white">
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex items-center">
                              <div className="break-words w-[90%]">
                                <a href={website} target="_blank">
                                  {website}
                                </a>
                              </div>
                              <div className="cursor-pointer w-[10%]">
                                <img
                                  width={18}
                                  src="/images/copy.png"
                                  onClick={() => {
                                    copyText(website);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex justify-evenly items-center">
                              <div className="w-[90%]">
                                <span className="">{username}</span>
                              </div>
                              <div className="cursor-pointer w-[10%]">
                                <img
                                  width={18}
                                  src="/images/copy.png"
                                  onClick={() => {
                                    copyText(username);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex justify-center items-center">
                              <div className="w-[90%]">
                              <span>{password}</span>
                              </div>
                              
                              <div className="cursor-pointer w-[10%]">
                                <img
                                  width={18}
                                  src="/images/copy.png"
                                  onClick={() => {
                                    copyText(password);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[20%]">
                            <div className="flex justify-evenly">
                              <span onClick={()=>{editPassword(id)}}>
                                <img
                                  className="cursor-pointer"
                                  width={15}
                                  height={15}
                                  src="/images/pencil.png"
                                />
                              </span>
                              <span onClick={()=>{deletePassword(id)}}>
                                <img
                                  className="cursor-pointer"
                                  width={15}
                                  height={15}
                                  src="/images/delete.png"
                                />
                              </span>
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
