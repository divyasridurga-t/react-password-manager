import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
let websiteUrlPattern = new RegExp(
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/a-zA-Z0-9#]+\/?)?$|^([a-zA-Z0-9._%+-]+@(outlook\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
);
let usernameRegularPattern = new RegExp(/^.{3,20}$/);
let passwordPattern = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export default function UIManager() {
  let [img, setImage] = useState("eyescross");
  let [savedImage, setSavedImage] = useState("eyescross");
  let [type, setType] = useState("password");
  let [savedType, setSavedType] = useState("password");
  let [form, setForm] = useState({ website: "", username: "", password: "" });
  let [passwordArray, setPasswordArray] = useState([]);
  let [showPassword, setShowPassword] = useState(false);
  let [edit, setEdit] = useState({ isEdit: false, id: "" });
  let [isValid, setIsValid] = useState({
    website: true,
    username: true,
    password: true,
  });
  let [isDisabled, setIsDisabled] = useState(true);

  // encrypting
  const secretKey = "hsfdjkhdusyr67w574we68rznfdkjv";

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      let bytes = CryptoJS.AES.decrypt(password, secretKey);
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setPasswordArray(decryptedData);
    }
  }, []);

  function handleClick() {
    setImage(img == "eyescross" ? "eyes" : "eyescross");
    setType(type == "password" ? "text" : "password");
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsValid({
      website: websiteUrlPattern.test(form.website),
      username: usernameRegularPattern.test(form.username),
      password: passwordPattern.test(form.password),
    });
    setIsDisabled(
      isValid.password && isValid.username && isValid.website ? false : true
    );
  };
  const savePassword = () => {
    setEdit({ isEdit: false });
    let data;
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      secretKey.toString()
    );
    data = encryptedData;
    if (edit.isEdit) {
      let x = passwordArray.filter((key) => {
        if (key.id == edit.id) {
          key.website = form.website;
          key.username = form.username;
          key.password = form.password;
        }
        return key;
      });
      setPasswordArray(x);
      let encryptedData_ = CryptoJS.AES.encrypt(
        JSON.stringify(x),
        secretKey.toString()
      );
      data = encryptedData_;
    }

    localStorage.setItem("passwords", data);
    toast(
      edit.isEdit
        ? "password edited successfully!"
        : "password added successfully!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      }
    );

    setForm({ website: "", username: "", password: "" });
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
      type: "success",
    });
    navigator.clipboard.writeText(text);
  };

  console.log(
    isValid,
    isValid.password && isValid.username && isValid.website,
    "????????????????????????????"
  );

  const deletePassword = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id != id));
    // let data=passwordArray.filter((item) => item.id != id)
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(passwordArray.filter((item) => item.id != id)),
      secretKey.toString()
    );

    localStorage.setItem("passwords", encryptedData);
    toast("password deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
    });
  };

  const editPassword = (id) => {
    setEdit({ isEdit: true, id: id });
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    // setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const showSavePassword = (id) => {
    passwordArray.filter((item) => {
      if (item.id === id) {
        setShowPassword(true);
      }
    });
    setSavedImage(savedImage == "eyescross" ? "eyes" : "eyescross");
    setSavedType(savedType == "password" ? "text" : "password");
  };

  let style = isDisabled ? "bg-slate-500" : "bg-purple-500";
  let box_shadow = isDisabled ? "shadow-slate-500/50" : "shadow-purple-500/50";

  return (
    <>
      <ToastContainer />
      {/* input fields */}
      <div className="w-11/12 max-w-4xl mx-auto pb-3">
        <div className="font-bold text-4xl flex justify-center pt-4">
          <div>
            <span className="text-purple-700"> &lt;</span>
            Pass
            <span className="text-purple-700">OP/&gt;</span>
          </div>
        </div>
        <div className="text-center text-lg">Your own password manager.</div>
        <div className="flex flex-col mt-4 px-4">
          <input
            value={form.website}
            onChange={handleChange}
            placeholder="Enter website url"
            name="website"
            className="w-full rounded-full border border-purple-700 h-10 px-3 mb-2"
            type="text"
            required
          />
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              name="username"
              type="text"
              className="w-full sm:w-1/2 rounded-full border border-purple-700 h-10 px-3"
              required
            />
            <div className="relative w-full sm:w-1/2">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                name="password"
                type={type}
                className="w-full rounded-full border border-purple-700 h-10 px-3"
                required
              />
              <span className="absolute right-3 top-2 cursor-pointer">
                <img
                  onClick={handleClick}
                  width={20}
                  height={25}
                  src={`https://i.ibb.co/RTV015Y/${img}.png`}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 text-red-600 font-bold capitalize">
          {!isValid.website
            ? "please enter a valid website url"
            : !isValid.username
            ? "please enter a valid username"
            : !isValid.password
            ? "please enter a valid password"
            : ""}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={savePassword}
            disabled={isDisabled}
            className={`flex gap-1 items-center p-2 ${style} rounded-full text-white font-semibold hover:${style} shadow-lg ${box_shadow}`}
          >
            {edit.isEdit ? (
              <>
                <span>Save Password</span>
              </>
            ) : (
              <>
                <span className="text-2xl">+ </span>
                <span>Add Password</span>
              </>
            )}
          </button>
        </div>
        {/* Display fields */}
        <div className="font-bold text-lg my-3">Your Passwords :</div>
        {passwordArray.length ? (
          <div className="overflow-x-auto">
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
                      let {
                        website = "",
                        username = "",
                        password = "",
                        id = "",
                      } = item;
                      return (
                        <tr key={index} className="border border-white">
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex items-center">
                              <div className="break-words w-[90%]">
                                <a
                                  href={website}
                                  target="_blank"
                                  className="truncate block"
                                >
                                  {website}
                                </a>
                              </div>
                              <div className="cursor-pointer w-[10%] ml-2">
                                <img
                                  width={18}
                                  src="https://i.ibb.co/7kp46Rf/copy.png"
                                  onClick={() => {
                                    copyText(website);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex items-center justify-center">
                              <div className="w-[90%] truncate">
                                <span>{username}</span>
                              </div>
                              <div className="cursor-pointer w-[10%] ml-2">
                                <img
                                  width={18}
                                  src="https://i.ibb.co/7kp46Rf/copy.png"
                                  onClick={() => {
                                    copyText(username);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[30%]">
                            <div className="flex items-center justify-center">
                              <div className="w-[50%]">
                                <input
                                  className="bg-purple-200 border-none w-full text-center"
                                  type={savedType}
                                  value={password}
                                  readOnly
                                />
                              </div>
                              <div className="cursor-pointer w-[10%] ml-2">
                                <img
                                  onClick={() => {
                                    showSavePassword(id);
                                  }}
                                  className="cursor-pointer"
                                  width={20}
                                  src={`https://i.ibb.co/RTV015Y/${savedImage}.png`}
                                />
                              </div>
                              <div className="cursor-pointer w-[10%] ml-2">
                                <img
                                  width={18}
                                  src="https://i.ibb.co/7kp46Rf/copy.png"
                                  onClick={() => {
                                    copyText(password);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-2 w-[20%]">
                            <div className="flex justify-center space-x-2">
                              <span
                                onClick={() => {
                                  editPassword(id);
                                }}
                              >
                                <img
                                  className="cursor-pointer"
                                  width={15}
                                  height={15}
                                  src="https://i.ibb.co/5R4cMfN/pencil.png"
                                />
                              </span>
                              <span
                                onClick={() => {
                                  deletePassword(id);
                                }}
                              >
                                <img
                                  className="cursor-pointer"
                                  width={15}
                                  height={15}
                                  src="https://i.ibb.co/nmK7MnM/delete.png"
                                />
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="font-semibold text-lg my-3">
            You didn't save any passwords yet
          </h2>
        )}
      </div>
    </>
  );
}
