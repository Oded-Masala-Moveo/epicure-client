import React, { useEffect } from "react";
import {
  AboutSection,
  ChefOfTehWeekSection,
  DishSection,
  RestSection,
  SignatureSection,
} from "../../components";
import { Hero } from "../../components";
import { closeAllNavbar, useAppDispatch } from "../../store";
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const sendCloseNavbar = (): void => {
    dispatch(closeAllNavbar(false));
  };

  return (
    <>
      <div onClick={sendCloseNavbar}>
        <Hero />
        <RestSection />
        <DishSection />
        <SignatureSection />
        <ChefOfTehWeekSection />
        <AboutSection />
      </div>
    </>
  );
};

export default HomePage;
