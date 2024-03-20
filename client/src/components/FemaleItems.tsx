// FemaleItems.tsx
import { Container, Grid, Typography } from "@mui/material";
import {
  StyledCard,
  StyledCardMedia,
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

const FemaleItems = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const {
    femaleItems,
    loading,
    handleButtonClick,
    buttonClickFemale,
    setCartItems,
  } = context;

  if (loading) {
    return (
      <MoonLoader color="#36d7b7" loading={loading} cssOverride={override} />
    );
  }

  if (femaleItems.length === 0) {
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
              onClick={() => handleButtonClick("XS", "female")}
              style={buttonClickFemale.XS ? newButtonStyle : oldButtonStyle}
            >
              XS
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("S", "female")}
              style={buttonClickFemale.S ? newButtonStyle : oldButtonStyle}
            >
              S
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("M", "female")}
              style={buttonClickFemale.M ? newButtonStyle : oldButtonStyle}
            >
              M
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("L", "female")}
              style={buttonClickFemale.L ? newButtonStyle : oldButtonStyle}
            >
              L
            </button>
            <button
              className="styled-buttons"
              onClick={() => handleButtonClick("XL", "female")}
              style={buttonClickFemale.XL ? newButtonStyle : oldButtonStyle}
            >
              XL
            </button>
          </Grid>
        </Grid>

        <Container maxWidth="md">
          <Grid container spacing={2}>
            {femaleItems.map((item) => (
              <Grid item key={item.id} md={4} sm={6} xs={12}>
                <StyledCard>
                  <StyledCardMedia image={item.url} className="card-image">
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

export default FemaleItems;
