// Cart.tsx
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useGlobalContext } from "../contexts/hook";
import { StyledButton } from "./Styles";
import { FaShoppingCart } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

interface SelectedSizes {
  [itemId: string]: string;
}

const Cart = () => {
  const context = useGlobalContext();
  const [selectedSizesInCart, setSelectedSizesInCart] = useState<SelectedSizes>(
    {}
  );

  if (!context) {
    return null;
  }

  const {
    setDisplayCart,
    cartItems,
    totalPrice,
    updateItemQuantity,
    setCartItems,
  } = context;

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    window.alert(`Your total is $${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="wrapper">
      <button
        className="side-panel-toggle"
        type="button"
        onClick={() => setDisplayCart(false)}
      >
        <span className="sp-icon-close">
          <KeyboardDoubleArrowRightIcon />
        </span>
      </button>
      <div className="side-panel">
        <div className="icon">
          <FaShoppingCart style={{ fontSize: "2rem" }} />
          <div className="circle red-circle-2">{cartItems.length}</div>
          <h2>Cart</h2>
        </div>
        <div className="side-panel-content">
          {cartItems.length === 0 ? (
            <h2>Add some products to the cart</h2>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="item-box">
                <div className="item-container">
                  <div className="item-column">
                    <img src={item.url} alt="clothing item" />
                    <div className="item-description">
                      <h4>{item.description}</h4>
                      <h4>Quantity : {item.quantity}</h4>
                      <h4>
                        Select Size:{" "}
                        {item.availableSize.map((size) => (
                          <p
                            key={size}
                            onClick={() =>
                              setSelectedSizesInCart((prevSelectedSizes) => ({
                                ...prevSelectedSizes,
                                [item.id]: size,
                              }))
                            }
                            style={{
                              color:
                                selectedSizesInCart[item.id] === size
                                  ? "goldenrod"
                                  : "white",
                              cursor: "pointer",
                            }}
                          >
                            {size}
                          </p>
                        ))}
                      </h4>
                    </div>
                  </div>
                  <div className="pricing-column">
                    <CloseIcon
                      style={{ cursor: "pointer", fontSize: "1rem" }}
                      onClick={() => removeFromCart(item.id)}
                    />
                    <h3 style={{ color: "goldenrod" }}>
                      {`$ ${(parseFloat(item.price) * item.quantity).toFixed(
                        2
                      )}`}
                    </h3>
                    <AddIcon
                      className="add-remove-icon"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    />
                    <RemoveIcon
                      className="add-remove-icon"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    />
                  </div>
                </div>
                <hr className="rule" />
              </div>
            ))
          )}
        </div>
        <div className="checkout">
          <div className="total-text">
            <h2>TOTAL</h2>
            <h2 style={{ color: "goldenrod" }}>{`$ ${totalPrice.toFixed(
              2
            )}`}</h2>
          </div>
          <StyledButton
            sx={{ color: "white", backgroundColor: "#023020" }}
            onClick={handleCheckout}
          >
            CHECKOUT
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
