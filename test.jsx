import { Box, Typography } from "@mui/material";
import React from "react";

const StartingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      sx={{
        backgroundImage: "url(/starting-page.png)",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        width: "1728px",
        height: "1117px",
        position: "relative",
        border: "1px solid black",
      }}
    >
      <Typography
        component="div"
        sx={{
          position: "absolute",
          width: "1210px",
          top: "29px",
          left: "259px",
          fontFamily: "Figma_Hand-Bold, Helvetica",
          color: "#cc6008",
          fontSize: "6rem",
          textAlign: "center",
        }}
      >
        <Box component="span" fontWeight="bold">
          Lost? Not Anymore!
          <br />
        </Box>
        <Box component="span" fontWeight="bold" fontSize="50px">
          Follow our routes, find the fun,
          <br />
          and explore the world with ease.
          <br />
        </Box>
        {conversation.map(text, index => 
            if (isEven) {
                //style left or right
            }
            return <Box>{text}</Box>
        )}
        <Box
          component="span"
          fontFamily="Figma_Hand-Regular, Helvetica"
          fontSize="40px"
        >
          Tap to start your journey!
        </Box>
      </Typography>
    </Box>
  );
};

export default StartingPage;