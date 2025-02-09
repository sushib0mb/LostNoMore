import React from "react";
import ExplorationPrompt from "./exploration";
import AdventureInput from "./adventureinput";

function TravelExplorer({ setInput, handleSubmit, chatArray, input }) {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-start px-12 py-16 bg-blue-900 border border-black border-solid shadow-[0px_4px_4px_rgb(26,46,7E)] max-md:px-5">
      <div className="flex flex-col px-6 py-8 max-w-full bg-neutral-700 rounded-[50px] w-[610px] max-md:pl-5">
        <ExplorationPrompt />
        <Chats chats={chatArray} />
        <AdventureInput setInput={setInput} handleSubmit={handleSubmit} input={input} />
      </div>
    </div>
  );
}

export default TravelExplorer;

const Chats = ({ chats }: { chats: any[] }) => {
  return (
    <div className="flex flex-col space-y-4 h-[450px] overflow-y-auto px-4 font-serif text-lg mt-10" style={{ fontFamily: 'Crimson Text' }}>
      {chats.map((chat, index) => {
        if (typeof chat === "object" && chat !== null) {
          return (
            <div key={index} className="space-y-2">
              {Object.entries(chat).map(([day, locations]) => (
                <div key={day} className="space-y-1">
                  <strong className="text-xl">{day}:</strong>
                  <ul className="pl-4">
                    {(locations as string[]).map((location: string, idx: number) => (
                      <li key={idx}>{location}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};
