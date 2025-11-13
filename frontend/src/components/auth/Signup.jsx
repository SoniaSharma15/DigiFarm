import React from "react";
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
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
function Signup() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    fullname: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("fullname", input.fullname);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    dispatch(setLoading(false));
    if (user) navigate("/");
  }, []);
  return (
    <>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="md:w-1/2 border border-gray-200 rounded-md p-6 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-4 text-center">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter full name here"
              onChange={changeEventHandler}
              name="fullname"
              value={input.fullname}
                            required

            />
          </div>
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
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter valid number"
              onChange={changeEventHandler}
              name="phoneNumber"
              value={input.phoneNumber}
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

          <div className="flex-col items-center justify-between">
            <RadioGroup className="flex items-center justify-between">
              <div className="flex items-center justify-between space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="farmer"
                  className="cursor-pointer"
                  checked={input.role === "farmer"}
                  onChange={changeEventHandler}
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
                              required

              ></Input>
            </div>
          </div>
         {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait !
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
            )} 
         
          <span className="text-sm">Already have an account?</span>
          <span className="text-blue-500 mx-1 text-sm">
            <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;
