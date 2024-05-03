import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import TableBarIcon from "@mui/icons-material/TableBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import Link from "next/link";

const SideBar = () => {
  const menus = [
    {
      id: 1,
      name: "menu",
      to: "/back-office/menu",
      icon: <RestaurantMenuIcon />,
    },
    {
      id: 2,
      name: "menu-category",
      to: "/back-office/menu-category",
      icon: <MenuBookIcon />,
    },
    {
      id: 3,
      name: "Addon Categories",
      icon: <ClassIcon />,
      to: "/back-office/addon-category",
    },
    {
      id: 4,
      name: "Addons",
      icon: <EggIcon />,
      to: "/back-office/addon",
    },
    {
      id: 5,
      name: "Tables",
      icon: <TableBarIcon />,
      to: "/back-office/table",
    },
    {
      id: 6,
      name: "Locations",
      icon: <LocationOnIcon />,
      to: "/back-office/location",
    },
    {
      id: 7,
      name: "Orders",
      icon: <LocationOnIcon />,
      to: "/back-office/order",
    },
  ];

  return (
    <Box sx={{ width: "15%", bgcolor: "#2D9596", height: "93.5vh" }}>
      <List>
        {menus.map((m) => (
          <Link
            href={m.to}
            key={m.id}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem key={m.id} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>{m.icon}</ListItemIcon>
                <ListItemText primary={m.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link
        href={"/back-office/setting"}
        style={{ textDecoration: "none", color: "white" }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <SettingsSuggestIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
    </Box>
  );
};

export default SideBar;
