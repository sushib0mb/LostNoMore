import React from "react";

function AdventureInput() {
  return (
    <form className="mt-[658px] max-md:mt-10 max-md:max-w-full">
      <label htmlFor="adventureInput" className="sr-only">Start typing your next adventure</label>
      <input
        id="adventureInput"
        type="text"
        className="px-7 pt-3 pb-5 text-3xl text-red-300 bg-stone-500 rounded-[30px] w-full max-md:px-5"
        placeholder="Start typing your next adventure… ✨"
        aria-label="Start typing your next adventure"
      />
    </form>
  );
}

export default AdventureInput;