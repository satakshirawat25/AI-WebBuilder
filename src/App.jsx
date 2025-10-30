import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { ImNewTab } from "react-icons/im";

import { MdOutlineArrowUpward } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import Editor from '@monaco-editor/react'


const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [code.setCode]=useState
  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mt-2 text-[30px] font-700">
          Create beautiful websites with{" "}
          <span className=" bg-gradient-to-br from-violet-400  to-purple-600 bg-clip-text text-transparent">
            {" "}
            WebBuilder
          </span>
        </h3>

        <p className="mt-2 text-[16px]">
          Describe your website and ai will give code for youu
        </p>

        <div className="inputBox">
          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            placeholder="describe your website in detail"
          ></textarea>

          {prompt !== "" ? (
            <>
              <i className="text-[20px] w-[30px] h-[30px] flex items-center justify-center bg-[#9933ff] rounded-[50%]  transition-all hover:bg-[#b3b3b3]">
                <MdOutlineArrowUpward />
              </i>
            </>
          ) : (
            ""
          )}
        </div>
        <p className="text-[20px] font-[700] mt-[10vh]">
          {" "}
          Your AI generated website will appeared here
        </p>

        <div className="preview ">
          <div className="header w-full h-[70px]">
            <h3 className="font-bold text-[15px]">Live Preview</h3>
            <div className="icons flex items-center gap-15px]">
              <div className="icon !w-[auto] !p-[12px] flex items-center gap-[10px]">
                Open in new tab <ImNewTab />
              </div>
              <div className="icon !w-[auto] !p-[12px] flex items-center gap-[10px]">
                Download
                <MdDownload />
              </div>
              <div
                onClick={() => {
                  setIsShowCode(!isShowCode);
                }}
                className="icon !w-[auto] !p-[12px] flex items-center gap-[10px]"
              >
                {isShowCode ? "Hide Code" : "Show Code"} {isShowCode ? <FaEyeSlash /> :<BiSolidShow /> }
                
              </div>
            </div>
          </div>

          {
            isShowCode? <><Editor height="100%" theme='vs-dark' defaultLanguage="html" value="<h1>Web builder </h1>" /></> : 
            <>
             <iframe srcDoc="" className="w-full  bg-[white]"></iframe>
            </>
          }
         
        </div>
      </div>
    </>
  );
};

export default App;
