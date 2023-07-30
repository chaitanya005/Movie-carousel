import React from "react";

const backgroundImageURL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/5eab1b22-c5ea-48b0-8ef4-862b3fa6df2c/4af43238-4df9-4946-9920-a4bd55f2e50b/IN-en-20230724-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const Hero = () => {
  return (
    <div className="relative max-w-[1400px] h-[300px] md:h-[450px] w-full m-auto py-10">
      <div
        style={{
          backgroundImage: `url(${backgroundImageURL}`,
        }}
        className="w-full h-full rounded-2xl cursor-pointer bg-center transition duration-300 ease-in-out bg-cover hover:opacity-80"
      ></div>
    </div>
  );
};
