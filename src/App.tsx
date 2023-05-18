import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./layouts";
import {
  RestaurantsPage,
  HomePage,
  RestaurantPage,
  ChefPage,
  CheckOut,
} from "./pages";

import "./app.scss";
import {
  selectBag,
  selectIsOrderPlaced,
  toggleOrderPlaced,
  useAppDispatch,
  useAppSelector,
} from "./store";
import useWindowSize, { desktop } from "./hooks/useWindowSize";
import { OrderSuccess, PopUp } from "./components";
const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const IsOrderPlaced = useAppSelector(selectIsOrderPlaced);
  const sendToggleOrderPlaced = (): void => {
    if (IsOrderPlaced) {
      console.log("a");
      dispatch(toggleOrderPlaced(false));
    }
  };
  return (
    <div className="html-container">
      <div>
        {location.pathname != "/checkout" && <Navbar />}
        {IsOrderPlaced && width > desktop - 1 && (
          <PopUp>
            <OrderSuccess isPopUp={true} />
          </PopUp>
        )}
        <div onClick={sendToggleOrderPlaced}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:restId" element={<RestaurantPage />} />
            <Route path="/chef" element={<ChefPage />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </div>
      </div>
      {location.pathname != "/checkout" && <Footer />}
    </div>
  );
};

export default App;
