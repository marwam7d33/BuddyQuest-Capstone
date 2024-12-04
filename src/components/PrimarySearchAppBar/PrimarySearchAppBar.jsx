import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    navigate("/login"); // Navigates to the login page
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    navigate("/login"); // Navigates to the login page
    handleMenuClose();
  };

  const handleMailClick = () => {
    navigate("/matchmaking"); // Navigate to matchmaking page
  };

  const handleNotificationClick = () => {
    navigate("/matchmaking"); // Navigate to matchmaking page
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleProfileClick}>My account</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#e8eee8", // Set the background color for the navbar
          boxShadow: "none", // Remove shadow for smooth blend
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon /> {/* Use the imported MenuIcon */}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="show 1 new mail"
            color="inherit"
            onClick={handleMailClick} // Navigate to matchmaking
          >
            <Badge badgeContent={1} color="error">
              {" "}
              {/* Set badge content to 1 */}
              <MailIcon sx={{ color: "forestgreen" }} />{" "}
              {/* Set color to forest green */}
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationClick} // Navigate to matchmaking
            sx={{
              position: "relative", // Ensure the badge is positioned correctly on the bell icon
              "& .MuiBadge-dot": {
                backgroundColor: "#f44336", // Use red for the notification dot
                width: "10px", // Customize size
                height: "10px", // Customize size
                borderRadius: "50%", // Make it a circle
              },
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent=" "
              color="error"
            >
              <NotificationsIcon sx={{ color: "forestgreen" }} />{" "}
              {/* Set color to forest green */}
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle sx={{ color: "forestgreen" }} />{" "}
            {/* Set color to forest green */}
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );
}
