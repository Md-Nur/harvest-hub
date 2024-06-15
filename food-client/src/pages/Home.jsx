import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import Foods from "../components/Foods";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Harvest Hub | Home</title>
      </Helmet>
      <Hero />
      <Foods />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
