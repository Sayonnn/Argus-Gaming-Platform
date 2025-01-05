/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useGSAP } from "@gsap/react";
import map1 from "../assets/images/maps/map_6.png";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { knights } from "../utilities/dataProvider";

import KnightInfo from "./modals/KnightInfo";
import { Knight } from "../utilities/typeProvider";

function Explore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [knightInPreview, setKnightInPreview] = useState<Knight | undefined>()
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  
  
  const moveKnights = () => {
    const overlay = overlayRef.current;
    // clean the container
    if (overlay) {
      overlay.innerHTML = "";
    }

    knights.forEach((knight) => {
      // random position
      const x = Math.random() * canvasRef.current!.width;
      const y = Math.random() * canvasRef.current!.height;

      // create knight div
      const knightDiv = document.createElement("div");
      knightDiv.id = knight.name; 
      knightDiv.style.position = "absolute";
      knightDiv.style.left = `${knight.x - 50}px`;
      knightDiv.style.top = `${knight.y - 70}px`;
      knightDiv.style.transition =
        "transform 0.2s ease-in-out, z-index 0.2s ease-in-out";
      knightDiv.innerHTML = `
        <div class="relative grid place-content-center md:hover:scale-150 hover:scale-100 transition ease duration-200 hover:z-[100]">
          <span class = "absolute top-[-15px] right-[5px] text-xs rounded-full w-5 h-5 grid place-content-center   font-bold text-white">⭐</span>
          <span class = "absolute top-[-5px] right-[-10px] text-xs rounded-full w-5 h-5 grid place-content-center  bg-emerald-700 font-bold text-white">${knight.ranking}</span>
          <img 
            src="${knight.image}" 
            class="md:w-[70px] md:h-[70px] w-[40px] h-[40px] rounded-full cursor-pointer object-contain transition ease-in duration-200 bg-white border-4 border-spacing-2 border-gray-900 hover:z-[100] " 
            style="box-shadow: 0 8px 15px rgba(255,255,255,0.7);" 
          />
          <span 
            style="
              position: absolute; 
              bottom: -18px; 
              left: 50%; 
              transform: translateX(-50%);
              width: 0; 
              height: 0; 
              border-left: 10px solid transparent; 
              border-right: 10px solid transparent; 
              border-top: 15px solid white;
            "
          >
          </span>
        </div>
      `;

      // Add hover effect for z-index
      knightDiv.addEventListener("mouseenter", () => {
        knightDiv.style.zIndex = "100"; 
      });

      knightDiv.addEventListener("mouseleave", () => {
        knightDiv.style.zIndex = "1"; 
      });

      knightDiv.addEventListener("click", () => {
        // activate the modal here
        previewKnight(knight)
        setKnightInPreview(knight)
      })

      // append knight div to overlay
      if (overlay) {
        overlay.appendChild(knightDiv);
      }

      // animate knight to new position
      gsap.to(knightDiv, {
        x: x - knightDiv.offsetLeft,
        y: y - (knightDiv.offsetTop + 80),
        duration: 2,
        ease: "power4.out",
      });

      // update knight coordinates
      knight.x = x;
      knight.y = y;
    });
  };

  // open modal for knight preview
  const previewKnight = (knight:Knight) => {
    document.body.style.overflow ="hidden"
    setKnightInPreview(knight);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    document.body.style.overflow ="auto"

    setIsModalOpen(!isModalOpen)
  }

  // reposition knights every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      moveKnights()
    },5000)

    return () => {
      clearInterval(interval)
    }
  },[])

  // map setup
  useEffect(() => {
    const setupMap = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        if (context) {
          const map = new Image();
          map.src = map1;
          map.onload = () => {
            context.drawImage(map, 0, 0, canvas.width, canvas.height);
            // initialize the knights
            moveKnights();
          };
        }
      }
    };

    setupMap();
  }, []);

  // animations
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#Explore",
        scrub: 1,
        start: "top 50%",
        end: "bottom 150%",
      },
    });

    timeline
      .fromTo(
        "#exploreTitle",
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          duration: 1,
          y: 0,
          ease: "power4.out",
        }
      )
      .fromTo(
        "#mapContainer",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power4.out",
        }
      );
  }, []);

  return (
    <section
      className={`md:h-[180vh] w-full relative md:mt-40 mt-20 mb-10 md:block overflow-hidden `}
      id="Explore"
    >
      <div
        className={`absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-r `}
      ></div>

      {/* Second div with shadow on top */}
      <section
        className={`relative bg-gray-900/90 md:px-40 w-full h-[100vh] p-4 `}
      >
        <div className="mb-10 flex items-center justify-center flex-col md:my-10">
          <h1 className="text-gray-400 border-l-2 border-gray-400 px-2">
            Knight Ranking • Arguz Kingdom
          </h1>
          <h1
            className="md:text-6xl text-3xl font-bold  text-center"
            id="exploreTitle"
          >
            <b className="text-emerald-300">Track</b> your{" "}
            <b className="text-emerald-300">Progress</b> and Ranking.
          </h1>
        </div>
        <section id="mapContainer" className=" ">
         
          {/* coords canvas for knight location on the map*/}
          <div
            ref={overlayRef}
            className="absolute top-0 left-0 w-full md:h-[100vh]  z-[1000]  "
          ></div>
          {/* map */}
          <canvas
            ref={canvasRef}
            className="w-full h-[50vh] sm:h-[50] md:h-[100vh] lg:h-[120vh] top-0 left-0  object-contain rounded-3xl  border-gray-700 opacity-[.8] absolute  rounder-lg"
          />
        </section>
      </section>
      {isModalOpen && (
        <KnightInfo info = {knightInPreview} closeModal = {closeModal}/>
      )}
    </section>
  );
}

export default Explore;
