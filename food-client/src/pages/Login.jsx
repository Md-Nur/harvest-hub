import { useState } from "react";
import FormPage from "../components/FormPage";
import GooglePopUpBtn from "../components/GooglePopUpBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  return (
    <FormPage title="Login" data={data}>
      <GooglePopUpBtn />
      <div className="divider">OR</div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
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
        <label className="label justify-start gap-2">
          Don't have any account?
          <Link to="/register" className="link link-hover">
            Register
          </Link>
        </label>
      </div>
    </FormPage>
  );
};

export default Login;
