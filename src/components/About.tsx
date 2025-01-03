import shield from "../assets/images/shield.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function What() {
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {

        trigger:"#What",
        start: "top 50%",
        toggleActions: "play none none reverse", 
      },
    });

    timeline
    .fromTo(
      "#shield",
      { x: -400, scale: 0.2, opacity: 0,rotate:360 },
      { x: 0, scale: 1, opacity: 1, duration: 1,rotate:0, ease: "power3.in" }
    )
    .fromTo("#subtitle",
      {opacity:0,x:800},{x:0,opacity:1,duration:.5,ease:"power1.in"}
    )
    .fromTo("#description1",
      {opacity:0,x:800},{x:0,opacity:1,duration:.5,ease:"power1.in"}
    )
    .fromTo("#description2",
      {opacity:0,x:800},{x:0,opacity:1,duration:.5,ease:"power1.in"}
    )
    .fromTo("#description3",
      {opacity:0,x:800},{x:0,opacity:1,duration:.5,ease:"power1.in"}
    )
     
     
  }, []);

  return (
    <section className="h-[auto] w-full relative overflow-hidden md:py-20 " id = "What">
      <div className="absolute top-0 left-0 w-full h-[100vh]"></div>

      {/* Second div with shadow on top */}
      <div className="relative bg-gray-900/90 md:px-40 w-full h-[100vh] p-4  flex md:flex-row gap-4 flex-col-reverse ">
        <section className="relative flex-1 flex md:items-start md:justify-start items-center justify-center  ">
          <img
            src={shield}
            alt="Knight"
            className="object-contain relative md:w-[400px] md:h-[500px] w-[300px] h-[370px] z-20 rounded-md  p-0  "
            id="shield"
          />
        </section>
        {/* Right Section with Radial Gradient */}
        <section className="flex-1 flex items-start flex-col justify-start gap-2 ">
          <p className=" border-l-2 border-gray-400 px-2 text-gray-400" >Are you ready to become a knight?</p>
          <h1 className="font-bold md:text-6xl text-4xl flex gap-2"  id="subtitle">
            Become one with just a few tricks
          </h1>
          <div className="mt-4 flex flex-col gap-4 justify-start items-start">
          <span className="text-gray-400 flex gap-4 items-center justify-center" id="description1">
            <span className ={`rounded-lg  border-gray-400 p-4 bg-gray-800 text-xl`}>01</span>
            <p className="text-xl">Code with unwavering courage and uphold integrity in every keystroke</p>
          </span>
          <span className="text-gray-400 flex gap-4 items-center justify-center" id="description2">
            <span className ={`rounded-lg  border-gray-400 p-4 bg-gray-800 text-xl`}>02</span>
            <p className="text-xl">Master the craft of problem-solving and debugging to conquer any challenge</p>
          </span>
          <span className="text-gray-400 flex gap-4 items-center justify-center" id="description3">
            <span className ={`rounded-lg  border-gray-400 p-4 bg-gray-800 text-xl`}>03</span>
            <p className="text-xl">Commit to lifelong learning and foster collaboration to achieve greatness </p>
          </span>
          </div>
        </section>
      </div>
    </section>
  );
}

export default What;
