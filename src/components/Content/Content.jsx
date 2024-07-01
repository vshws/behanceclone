/* eslint-disable no-unused-vars */
import { Eye, FolderClosed, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { data } from "../../data/content/images";
import { useAppState } from "../../context/Context";
import Modal from "./Modal";
import { HOST } from "../../data";
const ContentCard = (item) => {
  const {openModal, setOpenModal} = useAppState(false);
  const [hoveredImage, setHoveredImage] = useState(false);
  const onMouseEnter = () => {
    setHoveredImage(true);
  }
  const onMouseLeave = () => {
    setHoveredImage(false);
  }
  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex vignette relative"
        onClick={() => {
          setOpenModal(true);
          localStorage.setItem("item", JSON.stringify(item));
        }}
      >
        <img
          src={item.images[0]}
          alt="random"
          className="rounded-md w-[22rem] h-[16rem] object-cover"
          width={400}
          height={400}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {hoveredImage && (
          <div
          onMouseEnter={onMouseEnter}
            className="font-bold absolute top-2 left-2 z-10 flex justify-center items-center
          w-[5.5rem] text-sm text-white bg-gray-800 rounded-2xl
          "
          >
            <button className="p-2 rounded-full flex items-center justify-center gap-2">
              <FolderClosed size={16} className="" />
              <h1>Save</h1>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex">
            <h1 className="font-bold">{item.imageTitle}</h1>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="flex gap-1 items-center">
              <ThumbsUp size={16} className="text-gray-500" />
              <h1 className="font-bold">
                {item.likes > 1000
                  ? `${(item.likes / 1000).toFixed(1)}k`
                  : item.likes}
              </h1>
            </div>
            <div className="flex gap-1 items-center">
              <Eye size={16} className="text-gray-500" />
              <h1 className="font-bold">
                {item.views > 1000
                  ? `${(item.views / 1000).toFixed(1)}k`
                  : item.views}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex">
          <h1 className="text-sm text-gray-500 mt-[-2px]">
            {item.creatorName}
          </h1>
        </div>
      </div>
    </div>
  );

};
const Content = () => {
  const [signupActive, setSignupActive] = useState(true);
  const { recommendedStates, setRecommendedStates } = useAppState("");
  const [Cardsdata, setCardsData] = useState(data);
  const [originalData, setOriginalData] = useState(data);
  const { openModal, setOpenModal } = useAppState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${HOST}cards/all`,{
        method: 'GET',
      });
      if(response.ok){
        const data = await response.json();
        setCardsData(data.properties);
        setOriginalData(data.properties);
      }
    }
    fetchData();
  },[])
  useEffect(() => {
    if (recommendedStates !== "") {
      const filtered = originalData.filter((item) =>
        item.sort_by.includes(recommendedStates)
      );
      setCardsData(filtered.map((item) => item));
    } else {
      setCardsData(originalData.map((item) => item));
    }
  }, [recommendedStates]);
  return (
    <>
      <div className={`flex flex-col gap-8`}>
        <div className="flex flex-wrap gap-4">
          {Cardsdata.map((item, index) => (
            <ContentCard key={index} {...item} />
          ))}
        </div>
        {openModal && 
        <div className="flex relative top-0 right-0">
          <Modal/>
          </div>
          }
      </div>
    </>
  );
};

export default Content;
