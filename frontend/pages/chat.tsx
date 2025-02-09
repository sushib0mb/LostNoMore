import { useState } from "react";

const handleSubmit = async (userResponse: string) => {
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
    } catch (error) {
        console.error("Error:", error);
    }
};

export default function Chat() {
    const [input, setInput] = useState("")

    return (
        <>
        <p>chat</p>
        <input onChange={(e)=> {
            setInput(e.target.value)
        }
        }></input>
        <button onClick={() =>{
            handleSubmit(input)
        }}>hello</button>
        </>

    )
}