// import logo from "../assets/images/Logo_2.png";
import { icons } from "../utilities/icons";

function Footer() {
  return (
    <footer className="flex justify-between items-end  md:px-40 p-4 py-4 w-full">
      <span className="font-bold flex gap-2 md:text-sm text-xs">
        {/* <img src={logo} className={`object-contain w-[100px] h-[auto] `} /> */}
        Deployed on:{" "}
        <span className="text-emerald-300 flex items-center flex-row whitespace-nowrap ">
          {icons.iHostinger} ostinger
        </span>
      </span>
      <div className="flex flex-col gap-2 justify-end">
        <span className="font-bold flex gap-2 justify-end">
          <button className=" md:text-md md:p-3 text-md p-2 rounded-md bg-gradient-to-r from-emerald-900 to-emerald-700 font-normal flex items-center gap-2">
            {" "}
            {icons.iHelmet} BECOME A KNIGHT
          </button>
        </span>
        <span className="md:text-sm text-xs text-end ">
          Created by:{" "}
          <span className="text-emerald-300">Laud Zion • Zitech</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
