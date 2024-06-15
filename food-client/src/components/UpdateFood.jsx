import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateFood = ({ data, refetch }) => {
  const [updateData, setUpdateData] = useState(null);

  const { isSuccess, isLoading, error, isError, mutateAsync } = useMutation({
    mutationFn: () =>
      axios.put(`/update-food/${data._id}`, updateData).then((res) => res.data),
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isLoading) toast.loading("Updating Food");
    document.getElementById("update-" + data._id).close();
    await mutateAsync();
    if (isError) toast.error(error.message);
    if (isSuccess) {
      // queryClient.invalidateQueries("manage-my-foods");
      refetch();
      toast.success("Food updated successfully");
    }
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-info btn-sm"
        onClick={() =>
          document.getElementById("update-" + data._id).showModal()
        }
      >
        Update
      </button>
      <dialog id={"update-" + data._id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={data.food_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, food_name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Image</span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                defaultValue={data.food_image}
                onChange={(e) =>
                  setUpdateData({ ...updateData, food_image: e.target.value })
                }
              />
              <div className="form-control"></div>
              <label className="label">
                <span className="label-text">Food Quantity</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                defaultValue={data.food_quantity}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    food_quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pickup Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={data.pickup_location}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    pickup_location: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expire Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                defaultValue={data.expire_date}
                onChange={(e) =>
                  setUpdateData({ ...updateData, expire_date: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">Additional Notes</label>
              <textarea
                className="textarea textarea-bordered w-full"
                defaultValue={data.additional_notes}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    additional_notes: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Status</span>
              </label>
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked={data.food_status}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      food_status: e.target.checked,
                    })
                  }
                />
                <span className="label-text">Is Food Available?</span>
              </label>
            </div>
            <button className="btn btn-info m-5" type="submit">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateFood;
