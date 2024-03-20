// App.tsx
import FemaleItems from "./components/FemaleItems";
import Header from "./components/Header";
import { Grid } from "@mui/material";
import MaleItems from "./components/MaleItems";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./contexts/hook";
import Cart from "./components/Cart";

function App() {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { displayCart } = context;
  return (
    <Router>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Header />
        {displayCart && <Cart />}
        <Routes>
          <Route path="/" element={<FemaleItems />} />
          <Route path="/male" element={<MaleItems />} />
        </Routes>
      </Grid>
    </Router>
  );
}

export default App;
