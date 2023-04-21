import { Shop } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Popover,
  Toolbar,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppProvider";
import ShoppingCartProduct from "./ShoppingCartProduct";
import PopoverUI from "./PopoverUI";

function Header() {
  const { cart } = useContext(AppContext);
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"space-between"}
      borderBottom={1}
      sx={{
        paddingX: 5,
        paddingY: 4,
      }}
    >
      {/* <AppBar position="sticky">
        <Toolbar sx={{ bgcolor: "#000" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dummy Store
          </Typography>
          <ShoppingCartOutlinedIcon sx={{ cursor: "pointer" }} />
        </Toolbar>
      </AppBar> */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h2">Sample Store</Typography>
      </Link>
      {/* <Image src={AppLogo} width={100} alt="Sample Store Logo" /> */}

      <Button aria-describedby={id} variant="text" onClick={handlePopoverClick}>
        <Badge badgeContent={cart.length} color="warning">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </Button>
      <PopoverUI
        id={id}
        anchorEl={anchorEl}
        openPopover={openPopover}
        handlePopoverClose={handlePopoverClose}
      />
    </Box>
  );
}

export default Header;
