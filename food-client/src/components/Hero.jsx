import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero w-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="/FoodHero.png" className="w-9/12 max-w-sm rounded-lg" />
        <div>
          <h1 className="text-5xl font-bold">Harvest Hub</h1>
          <p className="py-6 max-w-lg">
            A platform that connects food donors with food banks and shelters.
            One person's excess food can be another person's meal.
          </p>
          <Link to="/available-foods" className="btn btn-primary">
            Explore Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
