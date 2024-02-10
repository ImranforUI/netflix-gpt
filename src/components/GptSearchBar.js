import React from "react";
import { useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";

const GptSearchBar = () => {

  const langKey = useSelector(store => store.config.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-3 m-3 col-span-9 rounded-lg  "
          placeholder={lang[langKey].gptSearchPlaceholder} 
        />
        <button className="py-2 m-3 px-4 col-span-3 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
