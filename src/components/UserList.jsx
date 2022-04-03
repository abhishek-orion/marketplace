import React from "react";
import Image from "mui-image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  small: { fontSize: "0.8rem" },
});

const UserListItem = ({ index }) => {
  const classes = useStyles();
  function getUserData() {
    return fetch("https://randomuser.me/api/").then((res) => res.json());
  }

  const { isLoading, data } = useQuery("userData", getUserData);
  if (isLoading) {
    return (
      <Box
        height="84px"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    const [user] = data.results;
    return (
      <Box
        sx={{
          display: "flex",
          margin: "20px 0",
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly", alignItems: "center" }}
        >
          <Typography variant="h6" className={classes.text}>
            {index + 1}.
          </Typography>
          <Image
            width="20%"
            sx={{ borderRadius: "50px" }}
            src={user.picture.large}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" className={classes.text}>
              {user.name.title} {user.name.first} {user.name.last}
            </Typography>
            <Typography
              variant="h6"
              className={classes.text}
              color="textSecondary"
            >
              {user.email}
            </Typography>
            <Typography
              variant="h6"
              className={classes.text}
              color="textSecondary"
            >
              {user.dob.age}
            </Typography>
          </Box>
          <VerifiedIcon sx={{ color: "#0072f5" }} />
        </Stack>
      </Box>
    );
  }
  return null;
};

const UserList = ({ limit }) => {
  const classes = useStyles();
  const allUserList = () => {
    let list = [];
    for (let i = 0; i < limit.max - limit.min; i++) {
      list.push(<UserListItem key={uuidv4()} index={i} />);
    }
    return list;
  };
  return (
    <Box>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" className={classes.bold}>
              Popular Seller
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.small}
            >
              See all
            </Typography>
          </Box>
        </Box>
        <Box>{allUserList()}</Box>
      </Stack>
    </Box>
  );
};

export default UserList;
