/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import img1 from "../assets/images/gallery/gallery_1.jpg";
import img2 from "../assets/images/gallery/gallery_2.jpg";
import img3 from "../assets/images/gallery/gallery_3.jpg";
import img4 from "../assets/images/gallery/gallery_4.jpg";
import img5 from "../assets/images/gallery/gallery_5.jpg";
import img6 from "../assets/images/gallery/gallery_6.jpg";
import img7 from "../assets/images/gallery/gallery_7.jpg";
import img8 from "../assets/images/gallery/gallery_8.jpg";
import img9 from "../assets/images/gallery/gallery_9.jpg";
import overlay1 from "../assets/images/gallery/overlay_1.png";
import overlay2 from "../assets/images/gallery/overlay_2.png";
import overlay3 from "../assets/images/gallery/overlay_3.png";
import overlay4 from "../assets/images/gallery/overlay_4.png";
import overlay5 from "../assets/images/gallery/overlay_5.png";
import overlay6 from "../assets/images/gallery/overlay_6.png";
import overlay7 from "../assets/images/gallery/overlay_7.png";
import overlay8 from "../assets/images/gallery/overlay_8.png";
import overlay9 from "../assets/images/gallery/overlay_9.png";
import s from "../assets/css/gallery.module.css";
import { useGSAP } from "@gsap/react";

type Image = {
  id: number;
  image: string;
  title: string;
  overlay:string;

};

function Gallery() {
  const images: Image[] = useMemo(
    () => [
      { id: 1, image: img1, title: "1",overlay:overlay1 },
      { id: 2, image: img2, title: "2",overlay:overlay2 },
      { id: 3, image: img3, title: "3",overlay:overlay3 },
      { id: 4, image: img4, title: "4",overlay:overlay4 },
      { id: 5, image: img5, title: "5",overlay:overlay5 },
      { id: 6, image: img6, title: "6",overlay:overlay6 },
      { id: 7, image: img7, title: "7",overlay:overlay7 },
      { id: 8, image: img8, title: "8",overlay:overlay8 },
      { id: 9, image: img9, title: "9",overlay:overlay9 },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isNext, setIsNext] = useState<boolean>();
  const [activeImage, setActiveImage] = useState<number>();
  const lengthGallery = images.length;

  const imagesInView = useMemo(() => {
    return images.slice(currentIndex, currentIndex + 1);
  }, [currentIndex, images]);

  useGSAP(() => {

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#galleryContainer",
        scrub: 1,
        start: "top 50%",
        end: "bottom 50%",
      },
    });

    timeline.fromTo(
      "#galleryTitle",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        duration: 3,
        y: 0,
        ease: "power4.out",
      }
    );


  }, [imagesInView]);

  useEffect(() => {
    const elements = document.querySelectorAll("#imagesContainer > div");
    gsap.fromTo(
      elements,
      { opacity: 0, x: 1000  },
      { opacity: 1, x: 0, duration: 1,  ease: "power4.out" }
    );
  }, [imagesInView,isNext]);

  const viewNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lengthGallery);
    setIsNext(true)
  }, [lengthGallery]);

  const viewPrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + lengthGallery) % lengthGallery
    );
    setIsNext(false)
  }, [lengthGallery]);

  const loadTracker = useMemo(() => {
    return images.map((img) => (
      <span
        key={img.id}
        className={`border w-2 h-2 rounded-full ${
          img.id === currentIndex + 1 ? "bg-gray-300" : "bg-gray-900"
        }`}
      ></span>
    ));
  }, [images, currentIndex]);

  const handleMouseEnter = (id:number) => {
    setActiveImage(id);
  };

  return (
    <section
      className={`${s.galleryWrapper} h-auto w-full  overflow-hidden block md:hidden`}
      id="galleryContainer"
    >
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-r"></div>
      <section className="relative bg-gray-900/90 md:px-40 w-full h-[100vh] p-4 flex flex-col items-center justify-center">
        <div className="mb-10 flex items-center justify-center flex-col md:my-10">
          <h1 className="text-gray-400 border-l-2 border-gray-400 px-2">
          Hall of Fame • Knights Legacy
          </h1>
          <h1
            className="md:text-6xl text-3xl font-bold text-center"
            id="galleryTitle"
          >
             <b className="text-emerald-300">Become One </b> with your{" "}
             <b className="text-emerald-300">Dream</b>
          </h1>
        </div>
        <div className={`md:space-x-4 space-x-2 py-20 ${s.galleryContainer}`} id="imagesContainer">
          {imagesInView.map((img: Image) => (
            <div
              className={` h-[400px] w-[300px] p-2 ${s.cardWrapper} `}
              key={img.id}
              id={`image${img.id}`}
              onMouseEnter={() => handleMouseEnter(img.id)}

            >
              {/* template wrapper */}
              <div className={`h-full rounded-2xl flex flex-col ${s.templateWrapper} ${activeImage === img.id ? s.hidden : ""}`}>
                <img
                  src={img.image}
                  className={` w-full h-full rounded-2xl ${s.templateImg}`}
                  alt={img.title}
                />
                <div className={`${s.templateDescription}`}>Description</div>
              </div>
               {/* template overlay */}
               <div
                  className={`h-full rounded-2xl flex flex-col  ${s.templateOverlayWrapper } ${
                    activeImage === img.id ? s.active : ""
                }`}
                >
                  <img
                    src={img.overlay}
                    className={`w-full h-full ${s.templateOverlayImg} `}
                    alt={img.title}
                  />
                </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center justify-center mt-4">
          {loadTracker}
        </div>
        <div className="flex gap-4 items-center justify-center mt-4">
          <button
            onClick={viewPrev}
            className="text-3xl h-20 w-20 rounded-lg grid place-items-center bg-gray-800"
          >
            &larr;
          </button>
          <button
            onClick={viewNext}
            className="text-3xl h-20 w-20 rounded-lg grid place-items-center bg-gray-800"
          >
            &rarr;
          </button>
        </div>
      </section>
    </section>
  );
}

export default Gallery;
