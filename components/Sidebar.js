import {
    HiChartBar,
    HiClock,
    HiDotsHorizontal,
    HiHome, } from "react-icons/hi";
  import { FaMicrophoneAlt } from "react-icons/fa";
  import { RiCompassFill } from "react-icons/ri";
  import Image from "next/image";
  

function Sidebar(){
    return(
        <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
        <Image
          src="/../public/logo.png"
          width={56}
          height={56}
          objectFit="contain"
        />
        <div className="flex flex-col space-y-8">
          <HiHome className="sidebarIcon text-white opacity-[0.85] text-xl" />
          <RiCompassFill className="sidebarIcon text-2xl " />
          <FaMicrophoneAlt className="sidebarIcon ml-1 " />
          <HiChartBar className="sidebarIcon " />
          <HiClock className="sidebarIcon " />
          <HiDotsHorizontal className="sidebarIcon " />
        </div>
      </section>
    )
}

export default Sidebar