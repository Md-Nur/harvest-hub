import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { MdDateRange, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Foods = () => {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["allFoods"],
    queryFn: () =>
      axios.get("/all-foods?sort=-1&limit=6").then((res) => res.data),
  });

  if (isLoading) return <Loading />;

  if (isError) toast.error(error.message);

  if (data.length === 0)
    return (
      <h2 className="text-center text-3xl font-bold my-5">
        No Foods Available
      </h2>
    );

  // console.log(data);
  return (
    <section className="w-full">
      <h2 className="text-center text-3xl font-bold my-5">Featured Foods</h2>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-wrap w-full gap-3 md:gap-10 p-1 justify-evenly"
      >
        {data?.map((food) => (
          <motion.div
            key={food._id}
            className="card w-96 bg-base-300 shadow-xl"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          >
            <figure>
              <img
                src={food.food_image}
                alt={food.food_name}
                className="object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {food.food_name}
                <MdOutlineProductionQuantityLimits />{" "}
                <div className="badge badge-secondary">
                  {food.food_quantity}
                </div>
              </h2>
              <p>{food.additional_notes}</p>
              <div className="grid grid-cols-2 gap-1 items-center w-full">
                <div className="flex flex-col gap-2">
                  <div className="avatar w-14">
                    <div className="w-14 h-14 rounded-full">
                      <img src={food.donator_image} />
                    </div>
                  </div>
                  <Link
                    to={`/food/${food._id}`}
                    className="btn btn-accent w-32"
                  >
                    View Details
                  </Link>
                </div>
                <div className="card-actions justify-end w-full">
                  <div className="badge badge-outline">{food.donator_name}</div>
                  <div className="w-full flex gap-1 items-center justify-end text-end">
                    <FaLocationDot />
                    {food.pickup_location}
                  </div>
                  <div className="badge badge-outline gap-1">
                    <MdDateRange />
                    {food.expire_date}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex w-full justify-center items-center my-5">
        <Link to="available-foods" className="btn btn-neutral">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default Foods;
