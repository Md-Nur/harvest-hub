import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthProvider";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const MyFoodRequest = () => {
  const { user } = useUserAuth();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["req-food"],
    queryFn: () =>
      axios.get(`/all-foods/?remail=${user.email}`).then((res) => res.data),
  });
  if (isPending) return <Loading />;
  if (isError) toast.error(error.message);
  if (data.length === 0)
    return (
      <>
        <Helmet>
          <title>Harvest Hub | My Food Request</title>
        </Helmet>
        <h1 className="text-3xl text-center">No Food Found</h1>;
      </>
    );

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Harvest Hub | My Food Request</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center py-10">My Food Request</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="">Donar Name</th>
            <th className="">Pickup Location</th>
            <th className="">Expire Date</th>
            <th className="">Request Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((food) => (
            <tr key={food._id} className="hover">
              <td>{food.donator_name}</td>
              <td>{food.pickup_location}</td>
              <td>{food.expire_date}</td>
              <td>{food.request_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodRequest;
