// MaleItems.tsx
import { Grid, Typography, Container } from "@mui/material";
import {
  StyledCard,
  StyledCardMedia, // Ensure these imports are correct
  StyledTypography,
  StyledButton,
} from "./Styles";
import { useGlobalContext } from "../contexts/hook";
import { MoonLoader } from "react-spinners";
import "../App.css";

interface Item {
  availableSize: string[];
  description: string;
  forGender: string;
  id: string;
  isFreeShipping: boolean;
  price: string;
  url: string;
  quantity: number;
}

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const newButtonStyle = { color: "white", backgroundColor: "black" };
const oldButtonStyle = { color: "black", backgroundColor: "white" };

const MaleItems = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const {
    maleItems,
    loading,
    handleButtonClick,
    buttonClickMale,
    setCartItems,
  } = context;

  if (loading) {
    return (
      <MoonLoader color="#36d7b7" loading={loading} cssOverride={override} />
    );
  }

  if (maleItems.length === 0) {
    return <h1>No items to display</h1>;
  }

  const handleCartClick = (product: Item) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const isInCart = prevItems.some((item) => item.id === product.id);

      // If not in the cart, add it; otherwise, keep the previous items
      return isInCart ? [...prevItems] : [...prevItems, product];
    });
  };

  return (
    <>
      <Grid container justifyContent="space-around" alignItems="flex-start">
        <Grid sx={{ margin: "10px", marginBottom: "20px" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Sizes :{" "}
          </Typography>
          <Grid item>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("XS", "male")}
              style={buttonClickMale.XS ? newButtonStyle : oldButtonStyle}
            >
              XS
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("S", "male")}
              style={buttonClickMale.S ? newButtonStyle : oldButtonStyle}
            >
              S
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("M", "male")}
              style={buttonClickMale.M ? newButtonStyle : oldButtonStyle}
            >
              M
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("L", "male")}
              style={buttonClickMale.L ? newButtonStyle : oldButtonStyle}
            >
              L
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("XL", "male")}
              style={buttonClickMale.XL ? newButtonStyle : oldButtonStyle}
            >
              XL
            </button>
          </Grid>
        </Grid>

        <Container maxWidth="md">
          <Grid container spacing={2}>
            {maleItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <StyledCard>
                  <StyledCardMedia
                    image={item.url}
                    className="card-image"
                    style={{ cursor: "pointer" }}
                  >
                    {item.isFreeShipping && (
                      <StyledTypography variant="subtitle2" gutterBottom>
                        FreeShipping
                      </StyledTypography>
                    )}
                  </StyledCardMedia>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", margin: "10px 0" }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {`$ ${item.price}`}
                  </Typography>
                  <StyledButton
                    sx={{
                      color: "white",
                      width: "fit-content",
                      margin: "10px auto 15px",
                    }}
                    onClick={() => handleCartClick(item)}
                  >
                    Add to cart
                  </StyledButton>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default MaleItems;
