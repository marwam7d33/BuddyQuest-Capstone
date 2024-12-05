import React, { useState } from "react";
 
 import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert"; // Corrected import
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar({
  notifications = [],
  onDismissNotification,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const navigate = useNavigate();

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
    navigate("/login");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    navigate("/login");
    handleMenuClose();
  };

  const handleMailClick = () => {
    navigate("/matchmaking");
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationItemClick = (link) => {
    navigate(link);
    handleNotificationClose();
  };

  const handleDismissNotification = (notificationId, event) => {
    event.stopPropagation();
    onDismissNotification(notificationId);
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

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      open={Boolean(notificationAnchorEl)}
      onClose={handleNotificationClose}
      PaperProps={{
        style: {
          maxHeight: 300,
          width: "300px",
        },
      }}
    >
      {notifications.length === 0 ? (
        <MenuItem disabled>No new notifications</MenuItem>
      ) : (
        notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => handleNotificationItemClick(notification.link)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{notification.message}</span>
            <IconButton
              size="small"
              onClick={(e) => handleDismissNotification(notification.id, e)}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        ))
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#e8eee8",
          boxShadow: "none",
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
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="show 1 new mail"
            color="inherit"
            onClick={handleMailClick}
          >
            <Badge badgeContent={1} color="error">
              <MailIcon sx={{ color: "forestgreen" }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationClick}
          >
            <Badge
              badgeContent={notifications.length}
              color="error"
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <NotificationsIcon sx={{ color: "forestgreen" }} />
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
            <AccountCircle sx={{ color: "forestgreen" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderNotificationsMenu}
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );
}
