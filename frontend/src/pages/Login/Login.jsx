import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../../components/common/AppCard";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useLoginUserMutation } from "../../redux/slices/apiSlice";
import { setCredentials } from "../../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData).unwrap();

      dispatch(setCredentials(res));

      navigate("/dashboard");
    } catch (err) {
      alert(err?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white items-center justify-center p-12">

        <div>

          <h1 className="text-6xl font-bold mb-6">
            Workspace Manager
          </h1>

          <p className="text-xl text-blue-100 leading-8">
            Manage Workspaces, Boards, Tasks, Comments and
            Notifications from one collaborative platform.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center bg-slate-100 p-8">

        <Card className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit}>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </Button>

          </form>

          <p className="mt-8 text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </Card>

      </div>

    </div>
  );
}

export default Login;