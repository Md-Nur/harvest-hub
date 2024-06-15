import { useState } from "react";
import FormPage from "../components/FormPage";
import GooglePopUpBtn from "../components/GooglePopUpBtn";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  return (
    <FormPage title="Register" data={data}>
      <GooglePopUpBtn />
      <div className="divider">OR</div>
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
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Photo URL</span>
        </label>
        <input
          type="url"
          placeholder="Photo URl"
          className="input input-bordered"
          onChange={(e) => setData({ ...data, photoURL: e.target.value })}
          required
        />
        <label className="label justify-start gap-2">
          Alreay have an account?
          <Link to="/login" className="link link-hover">
            Login
          </Link>
        </label>
      </div>
    </FormPage>
  );
};

export default Register;
