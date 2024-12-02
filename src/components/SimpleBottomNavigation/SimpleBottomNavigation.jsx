import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Task"; // Updated for "Habits" icon
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group"; // Updated for "Partners" icon
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    const routes = ["/", "/journal", "/matchmaking"];
    navigate(routes[newValue]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#e8eee8", // Set background color
        zIndex: 10, // Ensure it stays above other elements
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction label="Habits" icon={<HomeIcon />} />
        <BottomNavigationAction label="Journal" icon={<BookIcon />} />
        <BottomNavigationAction label="Partners" icon={<GroupIcon />} />
      </BottomNavigation>
    </Box>
  );
}
