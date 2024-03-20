// Header.tsx
import {
  StyledButton,
  StyledHeader,
  StyledHeading,
  StyledSpan,
} from "./Styles";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/hook";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const context = useGlobalContext();
  let itemsLength;

  if (!context) {
    return null;
  }

  const { maleItems, femaleItems, setDisplayCart, cartItems } = context;

  if (location.pathname === "/") {
    itemsLength = femaleItems.length;
  } else if (location.pathname === "/male") {
    itemsLength = maleItems.length;
  }

  return (
    <>
      <StyledSpan />
      <StyledHeading>
        <FaShoppingCart onClick={() => setDisplayCart(true)} />
        <div className="circle red-circle-1">{cartItems.length}</div>
      </StyledHeading>
      <StyledHeader>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="center"
          direction="column"
          flexWrap="wrap"
        >
          <Grid container alignItems="flex-start" justifyContent="flex-start">
            <Link to="/male">
              <StyledButton variant="contained">Male</StyledButton>
            </Link>
            <Link to="/">
              <StyledButton variant="contained">Female</StyledButton>
            </Link>
          </Grid>
          <Typography variant="h6">
            {itemsLength} {itemsLength === 1 ? "product" : "products"} found
          </Typography>
        </Grid>
      </StyledHeader>
    </>
  );
};

export default Header;
