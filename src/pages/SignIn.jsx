import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill out all fields"));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/auth/signin`,
        formData,
        { withCredentials: true }
      );

      // Assuming your server responds with an error message for user not found
      if (res.data && res.data.error) {
        dispatch(signInFailure(res.data.error));
        return;
      }

      // Handle other success scenarios
      if (res.data) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      // Check if the error is a 404 Not Found and handle it accordingly
      if (error.response && error.response.status === 404) {
        dispatch(signInFailure("User not found"));
      } else {
        // Handle other errors
        dispatch(signInFailure(error.message));
      }
    }
  };
  return (
    <div className="mt-20 min-h-screen">
      <div className=" flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className=" flex-1">
          <Link to="/" className=" text-4xl  font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              BlissFul
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign in with your email & password or use Goggle log in.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@example.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5 text-sm">
            <span className="mr-2 ">Don{"'"}t have an account?</span>
            <Link to="/sign-up" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </div>
          {errorMessage ? (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
