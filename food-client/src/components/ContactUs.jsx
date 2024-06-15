import { useState } from "react";
import FormPage from "./FormPage";

const ContactUs = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  return (
    <FormPage title="Contact Us" data={data}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea
          placeholder="Message"
          className="textarea textarea-bordered"
          onChange={(e) => setData({ ...data, message: e.target.value })}
          required
        ></textarea>
      </div>
    </FormPage>
  );
};

export default ContactUs;
