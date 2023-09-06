import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {apiurl,apimodel,apikey} from "../api/secret"

const Form = () => {

  
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const[position, setPosition] = useState<string>("");
  const navigate=useNavigate();
  const [loading,setLoading] = useState<Boolean>(false);
  const spin = <FontAwesomeIcon size="lg" spin icon={faSpinner} />

  useEffect(()=>{
    localStorage.removeItem("AI")
  },[])

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleContentPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
   setPosition(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data=`I want you to act as an ${role}. MY name is ${name} and I will be the candidate and you will ask me the interview questions for the position of ${position}.
   That will require me to have the following content
   
 ${content}
   
    I want you to only reply as the ${role}. Do not write all the conservation at once. I want you to only do the technical interview with me on coding and dsa also. Ask me the questions and wait for my answers. I will say the phrase “start the interview” for you to start. Ask one question at a time  if I am not able to answer satisfactorily, give me feedback in this framework:
   ####
   If it is a Data Structures and Algorithms or a coding technical question then
   REACTO: 
   R: Repeat (Repeating the question in your own word)
   E: Examples (Give some examples to clear out the meaning) and edge cases
   A: Approach (Discussing the approach to solve the question)
   C: Code (Writing the code with proper indentation, commenting and proper coding format)
   T: Testing the code (With some own test cases)
   O: Optimise (Use optimisation to optimise the already present code)
   ---
   If it is a Conceptual question then
   D: Definition
   U: Usecase
   B: Benefit
   X: Extra Information
   ---
   #####
   {<Ask me the questions individually like an interviewer and wait for my answers.>}
   Questions can include both new questions and follow up questions from the previous questions. Continue the process until I ask you to stop.  And, you will stop the interview when I tell you to stop using the phrase “stop the interview”. After that, you would provide me feedback when I ask you using the phrase, “share your feedback”.
   
   The cumulative feedback generated at the end should be evaluated using the following rubrics. While grading my responses you have to very strict like a real interviewer
   1.Subject Matter Expertise
   2.Communication skills
   3. Problem Solving skills
   4.Hiring criteria : Options are Reject, Waitlist, Hire and Strong Hire
   Feedback for Subject Matter Expertise and Communication skills should contain ratings on my interview responses from 0 - 10`
  //  console.log(data)
  let arr:any = [];

  // arr.push({
  //       "gpt":`Hlo, I am a chat gpt of yiour interview, please ask me questions.`
  //      })   
  //   localStorage.setItem("AI",JSON.stringify(arr));
  //   navigate("/chat")

  axios.post(apiurl, {
  model: apimodel, // Specify the model
  messages: [
    { role: "system", content: data },
  ],
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
    
    arr.push({ role: "system", content: assistantReply })
    localStorage.setItem("AI",JSON.stringify(arr))

    navigate("/chat")
    setContent("")
    setName("")
    setPosition("")
    setRole("")
  }).catch((err)=>{
    setLoading(false);
    console.log(err);
  })

  };


  return (
    <div className='bg-hero-pattern bg-cover w-screen h-screen fixed top-0 left-0 z-[-1] '>

    <div id='form' style={{boxShadow: "rgb(241,215,182) -30px 13px 25px",width:"450px"}} className='bg-[rgb(241,215,182)] h-screen rounded-lg p-4 ml-auto ' >
      <h1 className='font-bold text-2xl mt-24 px-10'>Interview Initiation Form</h1>
      <form onSubmit={handleSubmit} className='px-10'>
        <div className='p-4'>
          <label className=' px-2 rounded-lg font-bold ' htmlFor="role">Role For AI</label>
          <div>
            <input
              type="text"
              id="role"
              placeholder="Role for AI interviewer/teacher..."
              value={role}
              onChange={handleRoleChange}
              className='shadow-input w-full p-2 rounded-lg' 
              required
            />
          </div>
        </div>
        <div className='p-4'>
          <label className=' px-2 rounded-lg font-bold' htmlFor="name">Your Name</label>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className='shadow-input w-full p-2 rounded-lg' 
              required
            />
          </div>
        </div>
        <div className='p-4'>
          <label className=' px-2 rounded-lg font-bold' htmlFor="content">Position</label>
          <div>
            <input
              type="text"
              id="content"
              placeholder="Frontend,Backend Software...."
              value={position}
              onChange={handleContentPosition}
              className='shadow-input w-full p-2 rounded-lg' 
              required
            />
          </div>
        </div>
        <div className='p-4'>
          <label className=' px-2 rounded-lg font-bold' htmlFor="content">Content</label>
          <div>
            <input
              type="text"
              id="content"
              placeholder="Set content: JS, Node.js, React, JAVA..."
              value={content}
              onChange={handleContentChange}
              className='shadow-input w-full p-2 rounded-lg' 
              required
            />
          </div>
        </div>
        <div className='p-4'>
          <button type="submit" className='bg-blue-500 text-white p-2 w-full rounded-lg cursor-pointer hover:bg-blue-900'>{loading?spin:"Start the Interview"}</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Form;
