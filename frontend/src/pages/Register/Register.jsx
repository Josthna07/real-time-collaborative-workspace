import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useRegisterUserMutation } from "../../redux/slices/apiSlice";

function Register() {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData).unwrap();

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side - Hero Section */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-900 text-white items-center justify-center p-12 relative overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-md">

          <div className="mb-8 inline-flex items-center gap-3 bg-indigo-500/30 px-4 py-2 rounded-full">
            <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">New to Our Platform</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Join Our Team
          </h1>

          <p className="text-lg text-indigo-100 leading-relaxed mb-8">
            Get started with a free account and start collaborating with your team in real time today.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs font-bold text-purple-900">✓</span>
              </div>
              <span>Free to create and use</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs font-bold text-purple-900">✓</span>
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs font-bold text-purple-900">✓</span>
              </div>
              <span>Start collaborating instantly</span>
            </div>
          </div>

        </div>

      </div>

      {/* Right Side - Register Form */}

      <div className="flex-1 flex justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100 p-8">

        <Card className="w-full max-w-md shadow-2xl">

          <div className="mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-600 mb-4">
              <span className="text-white font-bold text-xl">WM</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-600 mb-8 text-sm">
            Sign up to start your collaboration journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" required />
              <span className="text-sm text-slate-600">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</a>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-slate-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
              >
                Sign in here
              </Link>
            </p>
          </div>

        </Card>

      </div>

    </div>
  );
}

export default Register;