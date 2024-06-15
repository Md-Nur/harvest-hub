import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDateRange, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const AvailableFoods = () => {
  const [search, setSearch] = useState();
  const [sort, setSort] = useState();
  const [layoutCol, setLayoutCol] = useState(3);

  let { data, isPending, isError, error } = useQuery({
    queryKey: ["available-foods"],
    queryFn: () =>
      axios.get("/all-foods?available=true").then((res) => res.data),
  });

  if (isPending) return <Loading />;
  if (isError) toast.error(error.message);

  if (search) {
    data = data.filter((food) =>
      food.food_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "Ascending") {
    data = data.sort(
      (a, b) => new Date(a.expire_date) - new Date(b.expire_date)
    );
  } else if (sort === "Descending") {
    data = data.sort(
      (a, b) => new Date(b.expire_date) - new Date(a.expire_date)
    );
  }

  if (data.length === 0)
    return (
      <>
        <Helmet>
          <title>Harvest Hub | My Food Request</title>
        </Helmet>
        <h1 className="text-3xl text-center">No Food Found</h1>;
      </>
    );

  if (!data.success) toast.error(data.message);

  return (
    <section className="w-full py-10">
      <Helmet>
        <title>Harvest Hub | Available Foods</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold my-5">Available Foods</h2>

      {/* Apply search and sorting inputs */}
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
        <div className="input input-bordered w-80 flex justify-between items-center">
          <input
            type="search"
            placeholder="Search Foods"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch />
        </div>
        <select
          className="select select-bordered w-80"
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Sort by Expiry Date</option>
          <option>Ascending</option>
          <option>Descending</option>
        </select>
        <select
          className="select select-bordered w-80"
          onChange={(e) => setLayoutCol(e.target.value)}
        >
          <option>Layout</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
        </select>
      </div>
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
        className={`p-1 md:p-5 lg:p-10 gap-3 md:gap-5 lg:gap-10 grid grid-cols-1 ${
          layoutCol === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        }`}
      >
        {data.map((food) => (
          <motion.div
            key={food._id}
            className="card bg-base-300 shadow-xl"
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
                  <div className="w-full flex gap-1 items-center justify-end text-end">
                    <MdDateRange />
                    {food.expire_date}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AvailableFoods;
