import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Image from "mui-image";
import Box from "@mui/material/Box";
import VerifiedIcon from "@mui/icons-material/Verified";
import { v4 as uuidv4 } from "uuid";

const NftImageListItem = ({ index }) => {
  return (
    <ImageListItem sx={{ margin: "0 8px" }}>
      <Box>
        <Image
          height="400px"
          width="400px"
          src={"https://source.unsplash.com/random"}
          alt={`randomImg-${index + 1}`}
          sx={{ borderRadius: "24px" }}
        />
        <ImageListItemBar
          title={
            <Box
              height="60px"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box>
                  Abstix
                  <VerifiedIcon
                    sx={{
                      color: "#0072f5",
                      fontSize: "0.5rem",
                      marginLeft: "4px",
                    }}
                  />
                </Box>
                Image {index + 1}
              </Box>
              <Box>
                <Box>Highest bid</Box>
                <Box>0.00005 ETH</Box>
              </Box>
            </Box>
          }
          sx={{
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
          }}
        />
      </Box>
    </ImageListItem>
  );
};

const NftImageList = ({ limit }) => {
  const allImageList = () => {
    let list = [];
    for (let i = 0; i < limit.max - limit.min; i++) {
      list.push(<NftImageListItem key={uuidv4()} index={i} />);
    }
    return list;
  };
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "inherit",
        maxHeight: "400px",
        flexDirection: "column",
        flexWrap: "wrap",
        overflowX: "scroll",
      }}
    >
      {allImageList()}
    </Box>
  );
};

export default NftImageList;
