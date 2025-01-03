import { useGSAP } from '@gsap/react';
import map1 from '../assets/images/maps/map_6.png'
import gsap from 'gsap';
function Explore() {

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#exploreContainer",
        scrub: 1,
        start: "top 50%",
        end: "bottom 100%",
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
    .fromTo("#mapContainer",{
      scale:0,
      opacity:0,
    },{
      scale:1,
      opacity:1,
      duration:2,
      ease:"power4.out"
    });

  }, []);

  return (
    <section className={`h-[150vh] w-full relative md:mt-40 mt-20 mb-10 md:block `} id='exploreContainer'>
      <div
        className={`absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-r `}
      ></div>

      {/* Second div with shadow on top */}
      <section
        className={`relative bg-gray-900/90 md:px-40 w-full h-[100vh] p-4 `}
      >
         <div className="mb-10 flex items-center justify-center flex-col md:my-10">
          <h1 className="text-gray-400 border-l-2 border-gray-400 px-2">
            Knight Ranking • Arguz Castle Map
          </h1>
          <h1
            className="md:text-6xl text-3xl font-bold  text-center"
            id="exploreTitle"
          >
            <b className="text-emerald-300">Track</b> your{" "}
            <b className="text-emerald-300">Progress</b> and Ranking.
          </h1>
        </div>
        <section id='mapContainer'>
          {/* map */}
          <img src={map1} className='object-contain w-full h-[100vh] opacity-[.7]'></img>
          {/* coords container for knight location */}
          <div></div>
        </section>
      </section>
    </section>
  );
}

export default Explore;
