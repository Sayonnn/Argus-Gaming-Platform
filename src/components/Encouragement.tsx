import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Encouragements() {
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: "#encouragement",
              start: "top 50%",
              end:"bottom 70%",
              scrub: 1, 
              toggleActions: "play none none reverse",
            },
          });

          timeline.fromTo("#title",
            {opacity:0,y:-100},
            {opacity:1,duration:2,y:0, ease:"circ.out"}
          )

    },[])

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 4.5, // Scrolls 100vh
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <section className={`md:h-[auto] h-[50vh] w-full relative  my-20`} id="encouragement">
      <div
        className={`absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-r `}
      ></div>

      <div className={`relative bg-gray-900/90 md:px-40 w-full h-[100vh] p-4 `}>
        <div
          className="absolute md:w-[150px] md:h-[150px] rounded-full "
          style={{
            backgroundImage: "radial-gradient(circle, white, white)",
            filter: "blur(200px)",
          }}
        ></div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-gray-400 border-l-2 border-gray-400 px-2">
            Become a knight
          </p>
          <h1 className="text-white text-center font-bold md:text-6xl text-3xl font-sans" id="title">
            Rise as a <b className="text-emerald-400">Software Knight</b> and
            conquer challenges with courage, and creativity.
          </h1>
          <span
            className="md:text-5xl text-3xl md:mt-10 mt-10 p-4 rounded-full bg-gray-800 md:w-[80px] w-[60px] md:h-[80px] h-[60px] text-center cursor-pointer hover:bg-gray-600"
            onClick={scrollDown}
            id="title"
          >
            &darr;
          </span>
        </div>
      </div>
    </section>
  );
}

export default Encouragements;
