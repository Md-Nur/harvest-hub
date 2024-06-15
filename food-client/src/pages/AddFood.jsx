import { useState } from "react";
import FormPage from "../components/FormPage";
import { useUserAuth } from "../context/UserAuthProvider";

const AddFood = () => {
  const { user } = useUserAuth();
  const [food, setFood] = useState({
    food_name: "",
    food_image: "",
    food_quantity: NaN,
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
    food_status: true,
    req_email: [],
    request_date: "",
    donator_name: user.displayName,
    donator_image: user.photoURL,
    donator_email: user.email,
  });

  return (
    <FormPage title="Add Food" data={food}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Food Name</span>
        </label>
        <input
          type="text"
          placeholder="Food Name"
          className="input input-bordered"
          onChange={(e) => setFood({ ...food, food_name: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Food Image</span>
        </label>
        <input
          type="url"
          placeholder="Image URL"
          className="input input-bordered"
          onChange={(e) => setFood({ ...food, food_image: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Food Quantity</span>
        </label>
        <input
          type="number"
          placeholder="Quantity"
          className="input input-bordered"
          onChange={(e) => setFood({ ...food, food_quantity: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pickup Location</span>
        </label>
        <input
          type="text"
          placeholder="Pickup Location"
          className="input input-bordered"
          onChange={(e) =>
            setFood({ ...food, pickup_location: e.target.value })
          }
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Expire Date</span>
        </label>
        <input
          type="date"
          placeholder="Expire Date"
          className="input input-bordered"
          onChange={(e) => setFood({ ...food, expire_date: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Additional Notes</span>
        </label>
        <textarea
          placeholder="Additional Notes"
          className="textarea textarea-bordered"
          onChange={(e) =>
            setFood({ ...food, additional_notes: e.target.value })
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
            defaultChecked={food.food_status}
            onChange={(e) =>
              setFood({ ...food, food_status: e.target.checked })
            }
          />
          <span className="label-text">Is Food Available?</span>
        </label>
      </div>
    </FormPage>
  );
};

export default AddFood;
