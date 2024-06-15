import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { MdDateRange, MdOutlineProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useUserAuth } from "../context/UserAuthProvider";
import { useState } from "react";

const FoodDetails = () => {
  const { id } = useParams();
  let nowDate = new Date().toISOString().split("T")[0];
  const { user } = useUserAuth();
  const [foodDetails, setFoodDetails] = useState("");

  const { isPending, error, data, isError, refetch } = useQuery({
    queryKey: ["Food Details", id],
    queryFn: () => axios.get(`/food-details/${id}`).then((res) => res.data),
  });

  let r_email;
  if (data?.req_email) {
    r_email = [...data.req_email, user.email];
  } else {
    r_email = [user.email];
  }

  const mutation = useMutation({
    mutationFn: () =>
      axios
        .put(`/update-food/${id}?onlyNotes=true`, {
          request_date: nowDate,
          req_email: [...new Set(r_email)],
          additional_notes: foodDetails,
          food_status: false,
        })
        .then((res) => res.data),
  });

  const handleDetails = (e) => {
    e.preventDefault();

    mutation.mutate();

    if (mutation.isLoading) toast.loading("Requesting Food");

    if (mutation.isError) toast.error(mutation.error.message);
    if (mutation.data) {
      toast.success("Food requested successfully");
      document.getElementById("food-details-" + id).close();
      refetch();
    }
  };

  if (isPending) return <Loading />;

  if (isError) toast.error(error.message);

  if (data.length === 0)
    return <h1 className="text-3xl text-center">No Food Found</h1>;

  return (
    <section>
      <Helmet>
        <title>Harvest Hub | {data?.food_name || ""}</title>
      </Helmet>
      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={data.food_image}
              alt={data.food_name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold">{data.food_name}</h2>
            <p className="text-lg my-5">{data.additional_notes}</p>
            <div className="flex items-center gap-5 my-5">
              <MdDateRange />
              <p>
                <span className="font-bold">Expiry Date:</span>{" "}
                {data.expire_date}
              </p>
            </div>
            <div className="flex items-center gap-5 my-5">
              <MdOutlineProductionQuantityLimits />
              <p>
                <span className="font-bold">Quantity:</span>{" "}
                {data.food_quantity}
              </p>
            </div>
            <div className="flex items-center gap-5 my-5">
              <FaLocationDot />
              <p>
                <span className="font-bold">Location:</span>{" "}
                {data.pickup_location}
              </p>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-secondary mt-5"
              onClick={() =>
                data.food_status
                  ? document
                      .getElementById("food-details-" + data._id)
                      .showModal()
                  : toast.error("Food is not available")
              }
            >
              Request Food
            </button>
            <dialog id={"food-details-" + data._id} className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <form
                  onSubmit={handleDetails}
                  className="p-5 bg-base-200 rounded-lg shadow-xl w-full"
                >
                  <label className="label">
                    <span className="label-text">Food Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.food_name}
                  />
                  <label className="label">
                    <span className="label-text">Food Image</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.food_image}
                  />

                  <label className="label">
                    <span className="label-text">Food Id</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data._id}
                  />

                  <label className="label">
                    <span className="label-text">Donator Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.donator_name}
                  />

                  <label className="label">
                    <span className="label-text">Donator Image</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.donator_image}
                  />

                  <label className="label">
                    <span className="label-text">Request Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={nowDate}
                  />

                  <label className="label">
                    <span className="label-text">User Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={user.email}
                    contentEditable={false}
                  />

                  <label className="label">
                    <span className="label-text">Pickup Location</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.pickup_location}
                  />

                  <label className="label">
                    <span className="label-text">Expire Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    contentEditable={false}
                    value={data.expire_date}
                  />

                  <label className="label">
                    <span className="label-text">Additional Notes</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    defaultValue={data.additional_notes}
                    onChange={(e) => setFoodDetails(e.target.value)}
                  ></textarea>

                  <button type="submit" className="btn btn-primary mt-5">
                    Request Food
                  </button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn btn-neutral">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
