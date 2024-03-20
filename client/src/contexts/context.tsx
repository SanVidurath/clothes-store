// context.tsx
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";

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

type ButtonSize = "XS" | "S" | "M" | "L" | "XL" | string; //because a union of string literals are used

interface AppContextProps {
  items: Item[];
  loading: boolean;
  maleItems: Item[];
  femaleItems: Item[];
  displayCart: boolean;
  setDisplayCart: Dispatch<SetStateAction<boolean>>;
  handleButtonClick: (size: ButtonSize, gender: string) => void;
  buttonClickFemale: {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
  };
  buttonClickMale: {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
  };
  selectedSizesFemale: ButtonSize[];
  selectedSizesMale: ButtonSize[];
  cartItems: Item[];
  setCartItems: Dispatch<SetStateAction<Item[]>>;
  totalPrice: number;
  updateItemQuantity: (id: string, newQuantity: number) => void;
}

export const AppContext = React.createContext<AppContextProps | undefined>(
  undefined
);

interface AppProviderProps {
  children: ReactNode;
}

const resourceURL = "http://localhost:3000/products";

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [femaleItems, setFemaleItems] = useState<Item[]>([]);
  const [maleItems, setMaleItems] = useState<Item[]>([]);
  const [displayCart, setDisplayCart] = useState(false);
  const [buttonClickFemale, setButtonClickFemale] = useState<{
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    [key: string]: boolean; // Index signature
  }>({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
  });
  const [buttonClickMale, setButtonClickMale] = useState<{
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    [key: string]: boolean; // Index signature
  }>({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
  });
  const [selectedSizesFemale, setSelectedSizesFemale] = useState<ButtonSize[]>(
    []
  );
  const [selectedSizesMale, setSelectedSizesMale] = useState<ButtonSize[]>([]);
  const storedStringCartItems = localStorage.getItem("cartItems");
  const storedCartItems = storedStringCartItems
    ? JSON.parse(storedStringCartItems)
    : [];
  const [cartItems, setCartItems] = useState<Item[] | []>(storedCartItems);
  const [totalPrice, setTotalPrice] = useState<number>(0.0);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url,
      });

      setItems(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        console.log("Error while fetching data", error);
      }
    }
    setLoading(false);
  }, []);

  const handleButtonClick = (size: ButtonSize, gender: string) => {
    if (gender === "female") {
      setButtonClickFemale((prevValue) => ({
        ...prevValue,
        [size]: !prevValue[size],
      }));

      setSelectedSizesFemale((prevSize) => {
        if (prevSize.includes(size)) {
          return prevSize.filter((s) => s !== size);
        } else {
          return [...prevSize, size];
        }
      });
    } else if (gender === "male") {
      setButtonClickMale((prevValue) => ({
        ...prevValue,
        [size]: !prevValue[size],
      }));

      setSelectedSizesMale((prevSize) => {
        if (prevSize.includes(size)) {
          return prevSize.filter((s) => s !== size);
        } else {
          return [...prevSize, size];
        }
      });
    }
  };

  const calculateTotalPrice = useCallback(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalPrice(parseFloat(total.toFixed(2))); // Ensure total is formatted to two decimal places
  }, [cartItems]);

  const updateItemQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  useEffect(() => {
    fetchData(resourceURL);
  }, [fetchData]);

  useEffect(() => {
    const femaleItemsOnly = items.filter((item) => {
      return (
        item.forGender === "female" &&
        (selectedSizesFemale.length === 0 ||
          selectedSizesFemale.every((size) =>
            item.availableSize.includes(size)
          ))
      );
    });
    setFemaleItems(femaleItemsOnly);
  }, [items, selectedSizesFemale]);

  useEffect(() => {
    const maleItemsOnly = items.filter((item) => {
      return (
        item.forGender === "male" &&
        (selectedSizesMale.length === 0 ||
          selectedSizesMale.every((size) => item.availableSize.includes(size)))
      );
    });
    setMaleItems(maleItemsOnly);
  }, [items, selectedSizesMale]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AppContext.Provider
      value={{
        items,
        loading,
        maleItems,
        femaleItems,
        displayCart,
        setDisplayCart,
        handleButtonClick,
        buttonClickFemale,
        buttonClickMale,
        selectedSizesFemale,
        selectedSizesMale,
        cartItems,
        setCartItems,
        totalPrice,
        updateItemQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
