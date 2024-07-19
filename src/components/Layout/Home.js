import React from "react";
import Background from "./Background";
import Footer from "./Footer";
import HeroSearchBox from "./HeroSearchBox";
import HomeSection1 from "./HomeSection1";
import HomeSection3 from "./HomeSection3";
import HomeSection2 from "./HomeSection2";
import HomeSection4 from "./HomeSection4";

const Home = () => {
  return (
    <div>
      <Background />
      <HeroSearchBox />
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <Footer />
    </div>
  );
};

export default Home;
