import Footer from "./Footer";
import Header from "./Header";

// import '../../../../asset/frontend/css/jquery-ui.min.css'

import Hero from "./Hero";
import ProductController from "../../../Controllers/FrontEnd/ProductsController";
import HeroController from "../../../Controllers/FrontEnd/HeroController";
import react, { useState } from "react";
import ForntLoder from "../../../Common/ForntLoder";

const Home = () => {
    const  [loading, setLoading] = useState(false)
  return (
    <>
      <ForntLoder loading={loading} />
      <Header />
      <HeroController />
      <ProductController />
      <Footer />
    </>
  );
};
export default Home;
