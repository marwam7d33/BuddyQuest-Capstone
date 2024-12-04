import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TaskIcon from "@mui/icons-material/Task";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";

const SimpleBottomNavigation = ({ bottomNavValue, setBottomNavValue }) => {
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setBottomNavValue(newValue);
    const routes = ["/", "/journal", "/matchmaking"];
    navigate(routes[newValue]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#e8eee8",
        zIndex: 10,
      }}
    >
      <BottomNavigation
        showLabels
        value={bottomNavValue}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction label="Habits" icon={<TaskIcon />} />
        <BottomNavigationAction label="Journal" icon={<BookIcon />} />
        <BottomNavigationAction label="Partners" icon={<GroupIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default SimpleBottomNavigation;
