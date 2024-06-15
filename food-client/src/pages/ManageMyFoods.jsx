import { useQuery } from "@tanstack/react-query";
import { useUserAuth } from "../context/UserAuthProvider";
import DeleteFood from "../components/DeleteFood";
import UpdateFood from "../components/UpdateFood";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet";

const ManageMyFoods = () => {
  const { user } = useUserAuth();
  const { data, error, isError, isPending, refetch } = useQuery({
    queryKey: ["manage-my-foods"],
    queryFn: () =>
      axios.get(`/all-foods?demail=${user.email}`).then((res) => res.data),
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
        <title>Harvest Hub | Manage My Foods</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center py-10">Manage My Foods</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">Fig</th>
            <th className="text-center">Food Name</th>
            <th className="text-center">Delete</th>
            <th className="text-center">Update</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.length &&
            data.map((food) => (
              <tr key={food._id} className="hover">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={food.food_image} alt={food.food_name} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-center">{food.food_name}</div>
                </td>
                <td>
                  <DeleteFood id={food._id} />
                </td>
                <td>
                  <UpdateFood data={food} refetch={refetch} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMyFoods;
