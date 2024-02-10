import React from 'react'
import { BACKGROUND_IMAGE } from '../utils/constants';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearch = () => {
  return (
    <div className=''>
       <div className="absolute -z-10">
        <img
          src={BACKGROUND_IMAGE}
          alt="background-img"
        />
      </div>
        <GptSearchBar/>
        {/* <GptMovieSuggestions/> */}

    </div>
  )
}

export default GptSearch;