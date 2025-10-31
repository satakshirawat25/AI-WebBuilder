import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { ImNewTab } from "react-icons/im";

import { MdOutlineArrowUpward } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import Editor from '@monaco-editor/react'
import { FaTabletAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { GoogleGenAI } from "@google/genai";
import { FadeLoader } from "react-spinners";
 



import { RiComputerLine } from "react-icons/ri";
import { API_KEY } from "./helper";



const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isInNewTab,setIsInNewTab]=useState(false)
  const [isShowCode, setIsShowCode] = useState(false);
  const [loading,setLoading]=useState(false)
  const [code,setCode]=useState(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
      <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-[10px]">
    <h1 class="text-[30px] font-[700]">wlcome to webBuilder</h1>
    
</body>
</html>

    `
  );

  const ai = new GoogleGenAI({apiKey:API_KEY});

  //Extract code
    function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  };


  const DownloadCode =()=>{
    let filename = "WebBuilderCode.html";
    let blob = new Blob([code],{type:"text/plain"});
    let url = URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href=url;
    a.download=filename;
    a.click()
    
  }







async function getResponse() {

  if(prompt===""){
    toast.error("Please enter a prompt");
    return
  };
  setLoading(true)

  const text_prompt = ` You are an expert frontend developer and UI/UX designer. The user will provide a detailed prompt describing what kind of website they want. Based on the user’s description, generate a fully working, production-ready website as a **single HTML file**. Use only **HTML, Tailwind CSS (via CDN)**, vanilla JavaScript, and GSAP (via CDN).  

Strict output rules:
- Return the website as a single fenced Markdown code block with the language tag.  
- Do NOT include any explanations, text, or extra code blocks outside that single block. Only the HTML file content.  

Technical requirements:
1. **Stack**: HTML + Tailwind CSS (via CDN) + vanilla JavaScript + GSAP (via CDN). Everything in one file.  
2. **Responsive**: Must be fully responsive (mobile, tablet, desktop) with modern grid and flex layouts.  
3. **Theme**: Default **dark mode**, but if the website type fits better in light mode, auto-select light mode. Include a **toggle button** to switch between dark and light themes.  
4. **Animations & Interactions**:  
   - GSAP scroll-based animations (fade, slide, stagger, parallax).  
   - Smooth hover effects with scale, shadow, and gradient transitions.  
   - Sticky navbar with subtle shadow on scroll.  
   - Animated gradient backgrounds or floating decorative shapes.  
5. **Visual richness**:  
   - Use high-quality **royalty-free images** (Unsplash via direct URLs).  
   - Apply **soft shadows, glassmorphism, or neumorphism** effects where suitable.  
   - Modern cards, rounded corners, gradient buttons, hover animations.  
6. **UI Sections** (as per user request):  
   - Sticky **Navbar** with logo + links + theme toggle.  
   - **Hero section** with headline, subheadline, CTA button, and background image/gradient.  
   - **Main content**: features grid, product showcase, gallery, blog cards, or whatever fits user’s request.  
   - **Call to Action** with strong button.  
   - **Footer** with the text: "Made with WebBuilder"  
7. **Code quality**: Clean, semantic HTML5, ARIA labels for accessibility, well-indented, professional Tailwind usage.  
8. **Performance**: Optimized. No external CSS/JS frameworks beyond Tailwind + GSAP. Use responsive images, gradients, inline SVGs, or Unsplash placeholders.  

Final instruction: Output only the single fenced Markdown code block with the full HTML file content. Nothing else.  

Website prompt: ${prompt}`


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text_prompt,
  });

  setCode(extractCode(response.text))
  setLoading(false)
  
}

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
              <i onClick={getResponse} className="text-[20px] w-[30px] h-[30px] flex items-center justify-center bg-[#9933ff] rounded-[50%]  transition-all hover:bg-[#b3b3b3]">
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
            <div className="icons flex items-center gap-[15px]">
              <div onClick={()=>{setIsInNewTab(true)}} className="icon !w-[auto] !p-[12px] flex items-center gap-[10px]">
                Open in new tab <ImNewTab />
              </div>
              <div onClick={DownloadCode} className="icon !w-[auto] !p-[12px] flex items-center gap-[10px]">
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
            isShowCode? <><Editor height="100%" theme='vs-dark' defaultLanguage="html" value={code} /></> : 
            <>
            {
              loading ? <div className="w-full h-full flex items-center justify-center flex-col">
              <FadeLoader color='#9933ff'/>
              <h3 className="text-[23px] font-semibold mt-4"><span className="bg-gradient-to-br from-violet-400  to-purple-600 bg-clip-text text-transparent">Generating </span>your website......</h3>
              </div> :
              <>
              
             <iframe srcDoc={code} className="w-full  bg-[white]"></iframe>
              </>

            }


            </>
          }
         
        </div>
      </div>

      {
        isInNewTab ?
        <>
        <div className="modelCon">
          <div className="modelBox text-black">
            <div className="header w-full px-[50px] flex items-center justify-between">


              <h3 className="font-[700]">Preview</h3>
              <div className="icons flex items-center gap-[15px]">
                <div className="icon"><RiComputerLine /></div>
                
                <div className="icon"><FaTabletAlt /></div>
                <div className="icon"><FaMobileAlt /></div>
              </div>
              <div className="icons">
                <div className="icon" onClick={()=>setIsInNewTab(false)}><IoIosClose /></div>
              </div>
            </div>
            <iframe srcDoc={code} className="w-full newTabIframe"></iframe>
          </div>
        </div>
        </>:""
}

    </>
  );
};

export default App;
