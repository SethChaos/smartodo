import { useMediaQuery, Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the menu icon
import SidebarItems from "./SidebarItems";
import { useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import Scrollbar from "@/app/(DashboardLayout)/components/custom-scroll/Scrollbar";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { isMobileSidebar, setIsMobileSidebar } = useContext(DashboardContext);

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxShadow: "0 9px 17.5px rgb(0, 0, 0, 0.05)!important",
              top: 0, // Removed the white space by setting top to 0
              height: "100%", // Ensure the sidebar takes the full height
            },
          }}
        >
          <Scrollbar sx={{ height: "100%" }}>
            <SidebarItems />
          </Scrollbar>
        </Drawer>
      </Box>
    );
  }

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <IconButton
        sx={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 1200,
          display: { lg: "none" }, // Hide on large screens
        }}
        onClick={() => setIsMobileSidebar(!isMobileSidebar)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isMobileSidebar}
        onClose={() => setIsMobileSidebar(!isMobileSidebar)}
        variant="temporary"
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxShadow: "0 9px 17.5px rgb(0, 0, 0, 0.05)!important",
            overflowX: "hidden",
            top: 0, // Removed the white space by setting top to 0
            height: "100%", // Ensure the sidebar takes the full height
          },
        }}
      >
        {/* Sidebar For Mobile */}
        <Scrollbar sx={{ height: "100%", overflowX: "hidden" }}>
          <SidebarItems />
        </Scrollbar>
      </Drawer>
    </>
  );
};

export default Sidebar;

