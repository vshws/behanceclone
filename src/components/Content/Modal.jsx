import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useAppState } from "../../context/Context";
import { HOST } from './../../data';

const Modal = () => {
  const { openModal, setOpenModal } = useAppState(false);
  const [time, setTime] = useState(1);
  const[alreadyLiked,setAlreadyLiked] = useState(false)
  const intervalRef = useRef(null);
  const [liked, setLiked] = useState(false);

  const countDown = () => {
    setTime((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      } else {
        const res=updateLikes(item._id);
        if(res==0) return 0;
        clearInterval(intervalRef.current);
        setAlreadyLiked(true)
        setLiked(false);
        return 0;
      }
    });
  };

  const startCountdown = () => {
    if(alreadyLiked) return;
    setLiked(true);
    intervalRef.current = setInterval(countDown, 1000);
  };
  const item = JSON.parse(localStorage.getItem("item"));
  useEffect(()=>{
    console.log(time)
  },[time])
  async function updateLikes(id) {
    if(alreadyLiked) returnz
    const response=await fetch(`${HOST}cards/like/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application json",
      }
    })
    const data=await response.json()
    if(!response.ok){
      return 0;
    }
  }
  return (
    <div className="fixed flex justify-center z-30 inset-0  backdrop-blur-sm brightness">
      <div className="flex flex-col gap-8 w-[90%] p-6 overflow-y-auto componentScroll">
        <div className="flex justify-between w-full h-fit">
          <div className="flex gap-3">
            <div className="flex w-12 h-12">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                alt=""
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col text-white ">
              <div className="flex font-bold">{item.imageTitle}</div>
              <div className="flex font-semibold gap-2">
                <h1>{item.creatorName}</h1>
                <h1>•</h1>
                <h1>Follow</h1>
              </div>
            </div>
          </div>
          <div
            className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 duration-300 transform cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <X size={20} className="text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="random"
              className="rounded-md w-full h-full object-cover"
              width={400}
              height={400}
            />
          ))}
          <div className="absolute right-5 z-30 shadow-lg py-4 rounded h-[35rem]">
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex flex-col gap-1 ">
                <div className="flex bg-white w-12 h-12 cursor-pointer rounded-full ">
                  <img
                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <h1 className="text-sm text-white sm:text-gray-400 font-semibold">
                    Share
                  </h1>
                </div>
              </div>
             
              <div className="flex flex-col gap-1 ">
                <div className="flex bg-white w-12 h-12 cursor-pointer p-4 rounded-full ">
                  <svg
                    className="Collection-icon-mXx Project-icon-qll"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <path
                      d="M5.69,3.395,7.97,5.487h6.217V7.579H2.858V3.743a.351.351,0,0,1,.354-.349ZM5.69,2H3.212a1.757,1.757,0,0,0-1.77,1.743V7.579h-1a.356.356,0,0,0-.27.123A.345.345,0,0,0,.1,7.985L1.336,14.68a.705.705,0,0,0,.7.572H15.012a.705.705,0,0,0,.7-.572L16.95,7.985a.345.345,0,0,0-.079-.283.356.356,0,0,0-.27-.123h-1V4.789a.7.7,0,0,0-.708-.7H8.523L6.859,2.514A1.657,1.657,0,0,0,5.69,2Z"
                      transform="translate(-0.023 -0.5)"
                    ></path>
                  </svg>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-sm text-white sm:text-gray-400 font-semibold">
                    Save
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex flex-col items-center justify-center text-sm ${
                    alreadyLiked ? "bg-black" : "bg-blue-500"
                  } hover:bg-blue1 transform duration-300 cursor-pointer w-12 p-4 h-12 rounded-full like-button`}
                  onClick={() => {startCountdown();}}
                >
                  {liked && time > 0 && (
                    <h1 className="text-white ">+1</h1>
                  )}
                  {!liked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0.5 0.5 16 16"
                      className={`like-button ${liked ? "liked" : ""}`}
                    >
                      <path fill="none" d="M.5.5h16v16H.5z"></path>
                      <path
                        fill={liked ? "#fff" : "#fff"}
                        d="M.5 7.5h3v8h-3zM7.207 15.207c.193.19.425.29.677.293H12c.256 0 .512-.098.707-.293l2.5-2.5c.19-.19.288-.457.293-.707V8.5c0-.553-.445-1-1-1h-5L11 5s.5-.792.5-1.5v-1c0-.553-.447-1-1-1l-1 2-4 4v6l1.707 1.707z"
                      ></path>
                    </svg>
                  )}
                </div>
                <div className="flex justify-center">
                  <h1 className="text-sm sm:text-gray-400 font-semibold text-white">
                    {alreadyLiked? "" : "Like"}
                    {alreadyLiked && `${item.likes+1} likes`}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
