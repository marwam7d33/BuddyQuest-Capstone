import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TaskIcon from "@mui/icons-material/Task";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const SimpleBottomNavigation = ({ bottomNavValue, setBottomNavValue }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this import and hook

  useEffect(() => {
    // Automatically set the correct bottom nav value based on current route
    const routes = ["/", "/journal", "/matchmaking"];
    const currentRouteIndex = routes.findIndex(
      (route) => location.pathname === route
    );

    if (currentRouteIndex !== -1) {
      setBottomNavValue(currentRouteIndex);
    }
  }, [location.pathname, setBottomNavValue]);

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
