import { Knight } from "../../utilities/typeProvider";
import { icons } from "../../utilities/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Define the component's prop type using the interfaces
interface KnightProps {
  info?: Knight;
  closeModal: () => void;
}

function KnightInfo({ info, closeModal }: KnightProps) {
  useGSAP(() => {
    gsap.fromTo(
      "#knightInfoContainer",
      { opacity: 0 },
      { opacity: 1, ease: "power4.out", duration: 1 }
    );

    gsap.fromTo("#cardLeft",{
        x:-1000,
        opacity:0,
    },{
        x:0,
        opacity:1,
        ease:"power4.out",
        duration:2,
    })

    gsap.fromTo("#cardRight",{
        x:1000,
        opacity:0,
    },{
        x:0,
        opacity:1,
        ease:"power4.out",
        duration:2,
    })
    gsap.fromTo("#knightInfoTitle",{
        y:-300,
        opacity:0,
    },{
        y:0,
        opacity:1,
        ease:"power4.out",
        duration:2,
    })
  }, []);

  const closeKnightInfo = () => {
    gsap.fromTo(
      "#knightInfoContainer",
      { opacity: 1 },
      { opacity: 0, ease: "power4.out", duration: 1 }
    );
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  return (
    <section
      className={`h-[100vh] w-full md z-[999] fixed top-0 left-0  grid place-content-center bg-gray-900/60`}
      id="knightInfoContainer"
    >
      <section
        className={`relative  md:px-40 w-full h-[100vh] m-auto rounded-lg p-4 z-50 shadow-xl md:overflow-hidden overflow-auto bg-gray-900 `}
      >
        <button
          className="fixed right-[1rem] top-[1rem]  hover:text-red-600 transition ease duration-200"
          onClick={closeKnightInfo}
        >
          {icons.iCloseFill}
        </button>
        <div className="flex items-center justify-center h-[100vh] flex-col ">
          <h1 className="text-gray-400  border-gray-400 px-2 mb-10" id="knightInfoTitle">
            Knight Leaderboard • Rank {info?.ranking}
          </h1>
          {/* card container */}
          <section className="relative grid md:grid-cols-2 grid-cols-1  md:gap-10 gap-16   ">
            {/* left */}
            <div
              className="relative md:h-[400px]  w-auto  "
              style={{ perspective: "1500px" }}
              id="cardLeft"
            >
              <img
                src={info?.image}
                className="object-contain w-full md:h-[400px] h-[400px] shadow-white "
                style={{
                  filter: "drop-shadow(0 10px 16px rgba(255,255,255,0.6)",
                }}
              ></img>
              <span
                className="absolute md:bottom-[-50px] bottom-[-30px] rounded-full bg-white w-full h-10 shadow-white shadow-2xl"
                style={{
                  transform: "rotateX(70deg)",
                  filter: "blur(150px) ",
                }}
              ></span>
            </div>
            {/* right */}
            <div className="relative p-4 flex flex-col bg-gray-800 rounded-xl gap-1" id="cardRight">
              <span className="uppercase font-bold text-3xl text-emerald-400">
                {info?.name}
              </span>
              <span className="uppercase text-xs  ">
                <b className="uppercase text-gray-300">Rank: </b>
                {info?.ranking}
              </span>
              <span className=" text-xs ">
                <b className="uppercase text-gray-300">Origin </b>
                {info?.origin}
              </span>
              <span className="uppercase text-xs ">
                <b className="uppercase text-gray-300">Age: </b>
                {info?.age}
              </span>
              <span className="text-xs">
                <b className="uppercase text-gray-300">Legacy: </b>
                {info?.legacy}
              </span>
              <span className="text-xs">
                <b className="uppercase text-gray-300">Journey: </b>
                {info?.journey}
              </span>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}

export default KnightInfo;
