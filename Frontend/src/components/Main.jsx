import React from "react";
import ComicsSection from "./ComicsSection";
import ClothesSection from "./ClothesSection";
import ActionFigureSection from "./ActionFigureSection";

const Main = () => {
  return (
    <>
      <div className="sticky top-0 z-10">
        <ComicsSection />
      </div>

      <hr />
      <div className="sticky top-0 z-20 ">
        <ClothesSection />
      </div>

      <hr />
      <div className="sticky z-30">
        <ActionFigureSection />
      </div>
    </>
  );
};

export default Main;
