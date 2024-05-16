import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#252934] ">
      <div className="h-[100vh]   mx-auto py-10 relative">
        <div className=" w-[70%] mx-auto">
          <div className="text-4xl font-bold text-white text-center ">
            CONTACT
          </div>
          <div className=" text-center text-xl text-[#04C2C9] py-10">
            Have a question or want to work together?
          </div>
          <div>
            <div className="mt-4 flex flex-col bg-gray-900 rounded-lg p-4 w-[50%] mx-auto">
              <div className="mt-4">
                <input
                  placeholder="Name"
                  className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                  type="text"
                />
              </div>
              <div className="mt-4">
                <input
                  placeholder="Enter Email"
                  className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                  type="text"
                />
              </div>

              <div className="mt-4">
                <textarea
                  rows={10}
                  placeholder="Your Message"
                  className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                  id="description"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  className="bg-teal-500 text-white rounded-md px-4 py-1 hover:bg-teal-600 hover:text-white"
                  id="generate-button"
                  type="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 bg-[#1B242F] h-40 w-screen">
          
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
