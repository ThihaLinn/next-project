import Image from "next/image";
import Link from "next/link";
import React from "react";

const Projects = () => {
  return (
    <div className=" bg-[#F5F5F5]">
      <div className="h-[100vh]  w-[70%] mx-auto py-7">
        <div className="text-4xl font-bold text-gray-500 text-center ">
          <h3> PROJECTS</h3>
        </div>
        <div className="flex justify-around mt-10 ">
          <div className="w-96 h-56 overflow-hidden group">
            <Image
              alt=""
              src={"/project.png"}
              width={400}
              height={200}
              className="cursor-pointer w-96 h-56"
            ></Image>

            <div className="w-96 h-56 bg-white opacity-95 group-hover:-translate-y-56 transition-all duration-300 flex justify-evenly items-center flex-col">
              <div>
                <div className="text-2xl font-semibold text-center">
                  Foodie Pos App
                </div>
                <div className="text-center text-[#16A6E9] text-lg">
                  ReactJS / NextTS
                </div>
              </div>
              <div className="w-fit bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
                <button className="px-5 py-2">
                  <Link href={"https://foodie-pos-three.vercel.app"}>
                    LEARN MORE
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
