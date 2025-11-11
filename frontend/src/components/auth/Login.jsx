import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
toast;
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) navigate("/");
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="md:w-1/2 border border-gray-200 rounded-md p-6 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-4 text-center">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Example: validmail@gmail.com"
              onChange={changeEventHandler}
              name="email"
              value={input.email}
              required
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Strong password"
              onChange={changeEventHandler}
              name="password"
              value={input.password}
                            required

            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center justify-between">
              <div className="flex items-center justify-between space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="farmer"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                  checked={input.role === "farmer"}
                ></Input>
                <Label htmlFor="r1">Farmer</Label>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="buyer"
                  className="cursor-pointer"
                  checked={input.role === "buyer"}
                  onChange={changeEventHandler}
                ></Input>
                <Label htmlFor="r2">Buyer</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait !
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm">Don't have an account?</span>
          <span className="text-blue-500 mx-1 text-sm">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
