import "./App.css";
import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./components/UserList";
import MenuIcon from "@mui/icons-material/MenuSharp";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import NftImageList from "./components/NftImageList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PopularView from "./components/PopularView";

const queryClient = new QueryClient();

const Views = Object.freeze({
  PRICE_DROP: "price_drop",
  POPULAR: "popular",
});

const useStyles = makeStyles({
  tabs: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#8992a9",
  },
  selectedTab: {
    color: "#0072f5",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
});

const MenuTabs = ({ selectedView, onViewChange }) => {
  const classes = useStyles();

  const onClick = (e) => {
    onViewChange(e.target.getAttribute("name"));
  };
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
      <Box>
        <Button onClick={onClick}>
          <Typography
            variant="h6"
            className={
              selectedView === "drop" ? classes.selectedTab : classes.tabs
            }
            name="drop"
          >
            Drop price
          </Typography>
        </Button>
      </Box>
      <Box>
        <Button onClick={onClick}>
          <Typography
            variant="h6"
            className={
              selectedView === "popular" ? classes.selectedTab : classes.tabs
            }
            name="popular"
          >
            Popular
          </Typography>
        </Button>
      </Box>
      <Box>
        <Button>
          <Typography variant="h6" className={classes.tabs}>
            Following
          </Typography>
        </Button>
      </Box>
      <Box>
        <Button>
          <Typography className={classes.tabs}>News</Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default function App() {
  const [selectedView, setSelectedView] = React.useState("drop");
  const [limit, setLimit] = React.useState({
    min: 0,
    max: 20,
  });
  const onViewChange = (view) => {
    setSelectedView(view);
  };

  function _getSelectedView() {
    switch (selectedView) {
      case Views.POPULAR:
        return <PopularView limit={limit} />;
      case Views.PRICE_DROP:
      default:
        return (
          <>
            <NftImageList limit={limit} />
            <UserList limit={limit} />
          </>
        );
    }
  }
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="sm" sx={{ padding: "24px 0" }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <MenuIcon />
            <Box sx={{ position: "relatives" }}>
              <NotificationsIcon />
              <span
                style={{
                  height: "6px",
                  width: "6px",
                  background: "red",
                  position: "absolute",
                  borderRadius: "4px",
                }}
              ></span>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" className={classes.bold}>
              Discover now
            </Typography>
            <TouchAppOutlinedIcon sx={{ marginLeft: "8px" }} />
          </Box>
          <MenuTabs onViewChange={onViewChange} selectedView={selectedView} />
          {_getSelectedView()}
        </Stack>
      </Container>
    </QueryClientProvider>
  );
}
