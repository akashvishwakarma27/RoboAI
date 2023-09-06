import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faMicrophone, faUserSecret, faVideoCamera,faUserCircle, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState,useEffect, useRef } from "react"
import audiomic from "../assets/mic.mp3"
import bot from "../assets/bot.gif"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import {apiurl,apimodel,apikey} from "../../api/secret"


export function ChatUI() {
  
    const mic = <FontAwesomeIcon size="lg" icon={faMicrophone} />
    const mic1 = <FontAwesomeIcon size="lg" fade icon={faMicrophone} />
    const send  = <FontAwesomeIcon size="lg" icon={faPaperPlane} />
    const camerais  = <FontAwesomeIcon size="xl" shake icon={faVideoCamera} />
    const user  = <FontAwesomeIcon size="lg" icon={faUserCircle} />
    const gpt  = <FontAwesomeIcon size="lg" icon={faUserSecret} />
    const spin = <FontAwesomeIcon size="lg" spin icon={faSpinner} />

    const [inp,setInp] = useState<any>("");
    const [check,setCheck] = useState<Boolean>(false);
    const [isPlaying, setIsPlaying] = useState<Boolean>(false);
    const [camera,setCamera] = useState<Boolean>(false);
    const [mockdata,setMockData] = useState<any>([]);
    const [loading,setLoading] = useState<Boolean>(false);
    const inputRef: any = useRef(null);
    const navigate = useNavigate()

    useEffect(()=>{
      let data = localStorage.getItem("AI");
      data? setMockData(JSON.parse(data)) : setMockData([]);
    },[mockdata])
    
    useEffect(() => {
        // Use useEffect to run code when the component mounts
        let data = localStorage.getItem("AI");
        if(!data){
          return;
        }
    
        const initializeCamera = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement("video");
            setCamera(false)
            videoElement.srcObject = stream;
            videoElement.play();
    
            videoElement.style.width = "90%";
            videoElement.style.height = "60%";
            videoElement.style.borderRadius = "20px";
            videoElement.style.margin = "auto";
    
            const container = document.getElementById("video-container");
            if (container) {
              container.appendChild(videoElement);
            }
          } catch (error) {
            console.error("Camera access denied:", error);
            alert("Please allow Camera Permission!!");
            setCamera(true)
          }
        };
    
        initializeCamera(); // Call the function to initialize the camera when the component mounts
    
        return () => {
          // Cleanup code (e.g., stop the camera stream) can go here if needed
        };
      }, []);

    const handleVoiceSearch = () => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            setCheck(true);
            setIsPlaying(true);
            setTimeout(() => {
                setIsPlaying(false);
              }, 1000); // 1000ms = 1 second
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = "en-IN"; // Set the language for speech recognition

            recognition.onstart = () => {
                setCheck(true);
              };
        
            recognition.onresult = (event:any) => {
                const speechResult = event.results[0][0].transcript;
                
                setInp(speechResult);
                inputRef.current.focus();
            };

            recognition.onend = ()=>{
              setCheck(false);
            }
        
            recognition.start();
        } else {
            console.log("Speech recognition not supported on this browser.");
            // You might want to provide a user-friendly message or alternative search method
        }
    };


      const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
          // "Enter" key was pressed
          handleSend();
          window.scrollTo(0, document.body.scrollHeight);
        }
      };

      const handleSend = ()=>{
        if(camera){
          alert("Please Allow Camera Permission!!")
          return;
        }

        if(inp===""){
          return;
        }
        if(loading){
          alert("Please Wait for Response");
          return;
        }

        mockdata.push({ role: "user", content: inp })
        localStorage.setItem("AI",JSON.stringify(mockdata))
        window.scrollTo(0, document.body.scrollHeight);

        // setTimeout(() => {
        //   mockdata.push({
        //     "gpt":"Thanks for asking this question, i am ready to give you answer please proceed."
        //   })
        //   localStorage.setItem("AI",JSON.stringify(mockdata))
        //   window.scrollTo(0, document.body.scrollHeight);
        // }, 2000);
        setLoading(true);


        axios.post(apiurl, {
        model: apimodel, // Specify the model
        messages: mockdata,
        }, {
        headers: {
          'Authorization': `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
        })
        .then((res)=>{
          setLoading(false);

          const assistantReply = res.data.choices[0].message.content;
          console.log(assistantReply);
          
          mockdata.push({ role: "system", content: assistantReply })
          localStorage.setItem("AI",JSON.stringify(mockdata))
          window.scrollTo(0, document.body.scrollHeight);

        }).catch((err)=>{
          setLoading(false);
          console.log(err);
        })

        setInp("")
      }

      const handleEnd= ()=>{
        if(camera){
          alert("Please Allow Camera Permission!!")
          return;
        }

        if(loading){
          alert("Please Wait for Response");
          return;
        }

        let arr = mockdata;

        arr.push({ role: "user", content: "please give me feedback according to our chat conversation ,from 0-10 in communication skills and technical skills rate and in hiring criteria you can give Hire, Strong Hire, Waitlist, Rejected according to conversation and rated based(communication and technical)  like this :- Communication skills - 0-10/10 /n Technical Skills - 0-10/10 /n Hiring Criteria - Hire/Strong Hire/Rejected/Waitlist, and one more thing, don't give me description, give me only number like 8 , 9 , Hire like this" })
        localStorage.setItem("AI",JSON.stringify(arr))
        window.scrollTo(0, document.body.scrollHeight);

        setLoading(true);


        axios.post(apiurl, {
        model: apimodel, // Specify the model
        messages: mockdata,
        }, {
        headers: {
          'Authorization': `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
        })
        .then((res)=>{
          setLoading(false);

          const assistantReply = res.data.choices[0].message.content;
          console.log(assistantReply);
          
          localStorage.setItem("feedback",JSON.stringify(assistantReply));
          navigate("/feedback")
          localStorage.removeItem("AI");

        }).catch((err)=>{
          setLoading(false);
          console.log(err);
        })

        setInp("")
      }
      
      let data = localStorage.getItem("AI");
      if(!data){
        return <Navigate to="/" />;
      }
    
    return (
        <>
        <div className="w-full h-full mb-30 flex gap-10 space-between ">
            <div style={{width:"400px",position:"fixed"}} className="p-2 border-2 border-r-gray-950 flex flex-col hidden md:block sm:block base:block lg:block">
                <div style={{width:"100%",margin:"auto"}}>
                    <img style={{width:"50%",height:"auto",display:"block",margin:"auto"}} src={bot} alt="bot-image" />
                </div><br/><br/>
                <div id="video-container" style={{width:"90%",margin:"auto",marginBottom:"110px"}}></div>
                {camera && <div className="font-bold text-xl mt-10 text-center text-red-500">Please Allow Camera Permission, It is required!!</div>}
                {camera && <div className="font-bold text-2xl mb-40 text-center text-red-500">{camerais}</div>}
            </div>
            <div style={{width:"60%"}} className="mr-20 mb-20 ml-auto h-100%">
              {
                mockdata.map((item:any)=>(
                  <div style={{width:"850px"}}>
                    {item.role==="system" && <h1 className="bg-gray-200 w-100% p-2 rounded-xl mt-2">{gpt} {item.content}</h1>}
                    {item.role==="user" && <h1 className="w-100% bg-amber-100 p-2 mt-2 rounded-xl">{user} {item.content}</h1> }
                  </div>
                ))
              }
            </div>
        </div>
        <div className="w-full fixed bottom-0 z-9999 flex" >
            <input ref={inputRef} value={inp} onKeyPress={handleKeyPress} onChange={(e)=> setInp(e.target.value)} className="flex-grow border-2 border-black focus:border-custom-focus outline-none p-2" placeholder="Type...." />
            <div onClick={handleSend} style={{background:inp===""?"black":"green"}} className="flex items-center pl-4 pr-4 justify-center text-gray-50 cursor-pointer border-r border-white">{loading? spin:send}</div>
            <div onClick={handleVoiceSearch} className="flex items-center pl-4 pr-4 justify-center bg-gray-950 hover:bg-gray-950 text-gray-50 cursor-pointer">{check? mic1:mic}</div>
        </div>
        {isPlaying && <audio src={audiomic} autoPlay></audio>}
        {!loading && <button onClick={handleEnd} style={{boxShadow:"#000 2px 2px 2px",background:"black",color:"white",position:"fixed",bottom:"50px",right:"400px",borderRadius:"10px",padding:"5px 7px"}}>End the Interview</button>}
        </>
    )
}
