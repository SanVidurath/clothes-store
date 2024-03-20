// Styles.tsx
import { Button, Typography, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

export const StyledHeader = styled("header")(() => ({
  margin: "10px 0 20px",
}));

export const StyledTypography = styled(Typography)(() => ({
  color: "white",
  position: "relative",
  top: 0,
  right: 0,
  width: "fit-content",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a background color for better visibility
  padding: "5px",
  borderRadius: "5px",
  pointerEvents: "none",
  zIndex: "100",
}));

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#2a2727",
  margin: "10px 5px 10px 0",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
}));

export const StyledCardMedia = styled(CardMedia)(() => ({
  position: "relative",
  paddingTop: "100%",
  cursor: "pointer",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 1)", // Adjust the overlay color and transparency here
    opacity: 0,
  },
  "&:hover::before": {
    opacity: 1, // Set the desired transparency on hover
  },
}));

export const StyledSpan = styled("span")(() => ({
  borderTop: "80px solid #2a2727",
  borderLeft: "80px solid transparent",
  position: "fixed", // Change from "absolute" to "fixed"
  top: "0",
  right: "0",
  zIndex: 1000, // Adjust the z-index to make sure it's above other elements
}));

export const StyledHeading = styled("h1")(() => ({
  position: "fixed",
  top: "-15px",
  right: "10px",
  zIndex: 1000,
  color: "white",
  textAlign: "center",
  cursor: "pointer",
}));
