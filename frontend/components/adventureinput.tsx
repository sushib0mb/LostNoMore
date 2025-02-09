import React from "react";

function AdventureInput({ setInput, handleSubmit, input }) {
  return (
    <form className="mt-[120px] max-md:mt-10 max-md:max-w-full">
      <label htmlFor="adventureInput" className="sr-only">
        Start typing your next adventure
      </label>
      <div className="flex items-center bg-stone-500 rounded-[30px] overflow-hidden">
        <input
          id="adventureInput"
          type="text"
          value={input}
          className="px-7 pt-3 pb-5 text-3xl text-red-300 bg-stone-500 rounded-l-[30px] flex-grow outline-none"
          placeholder="Start typing your next adventure… ✨"
          aria-label="Start typing your next adventure"
          onChange={(e) => setInput(e.target.value)}
          style={{ fontSize: "25px", fontFamily: "Crimson Text" }}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 text-4xl text-white hover:opacity-90 transition duration-300"
          style={{ fontSize: "2rem" }}  // Increase the font size here
        >
          ↲
        </button>
      </div>
    </form>
  );
}

export default AdventureInput;
