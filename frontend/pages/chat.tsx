import TravelExplorer from "@/components/background";
import React from "react";
import { useState } from "react";

export default function Chat() {
    const [input, setInput] = useState("")
    // state thats an array 
    const [chats, setChats] = useState([])
    const [isBlocked, setIsBlocked]=useState(false)
    console.log(input)

    
const fetchResponse  = async (userResponse) => {
    try {
        const response = await fetch("http://localhost:8000/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userResponse
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        //set state 
        setChats((chats) => {
            return [...chats, responseData];
        })
        // setIsBlocked((isBlocked)) => true;
    } catch (error) {
        console.error("Error:", error);
    }
};

    const handleSubmit = () => {
        // setIsBlocked((isBlocked)) => true;
        fetchResponse(input)
    }
    
  return (
    <>   
        <TravelExplorer setInput={setInput} handleSubmit={handleSubmit} chatArray={chats}/>
        </>
  );
}

  
