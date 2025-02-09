import React from "react";
import ExplorationPrompt from "./exploration";
import AdventureInput from "./adventureinput";

function TravelExplorer({setInput, handleSubmit, chatArray}) {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-start px-12 py-16 bg-blue-900 border border-black border-solid shadow-[0px_4px_4px_rgb(26,46,7E)] max-md:px-5">
      <div className="flex flex-col px-6 py-8 max-w-full bg-neutral-700 rounded-[50px] w-[610px] max-md:pl-5">
        <ExplorationPrompt />
        <Chats chats={chatArray}/>
        <AdventureInput setInput={setInput} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default TravelExplorer;

const Chats = ({ chats }: { chats: string[] }) => {
  return (
    console.log(chats),
    <div>
      {chats.map((chat, index) => (
        <p key={index}>{chat}</p>
      ))}
    </div>
  );
}