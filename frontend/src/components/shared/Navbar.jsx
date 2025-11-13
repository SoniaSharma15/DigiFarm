import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar,AvatarFallback, AvatarImage} from "../ui/avatar";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import localStorage from "redux-persist/es/storage";

function Navbar() {
  // const user="Sonia"
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const logoutHandler = async () => {
  try {
    const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
    if (res.data.success) {
      dispatch(setAuthUser(null));
      localStorage.removeItem("token");
      //  if you're using it
      navigate("/");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Logout failed");
  }
  };
  return (
    <div className="bg-white">
      <div className={`flex ${!user?'flex-col md:flex-row':'flex-col md:flex-row'} items-center justify-between mx-auto max-w-7xl h-16 my-2 `}>
        <div>
          <h1 className="text-2xl font-bold pl-2 text-yellow-500">
            <Link to={"/"}>
              {" "}
              Digi <span className="text-green-900">Farm</span>
            </Link>{" "}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium item center gap-5 ">
            {user && user.role === "buyer" ? (
              <>
                <li className="cursor-pointer">
                  <Link to={"/buyer-dashboard"}>Dashboard</Link>
                </li>
              <li className="cursor-pointer">
                  <Link to={"/admin/jobs"}>View Crops</Link>
                </li>
            
              </>
            ) : (
              <>
                <li className="cursor-pointer ml-1">
                  <Link to={"/"}>Home</Link>
                </li>
                {/* Overview of available produce and nearby mandis */}
                <li className="cursor-pointer">
                  <Link to={"/market"}>Market</Link>
                </li>
                {/* View all available crops, filter by type, price, or location */}
             
                {user &&    <li className="cursor-pointer">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>}
                {/* Add your crop or quantity requirements for farmers to view */}
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-1 md:gap-4">
              <Link to={"/login"}>
                <Button
                  variant="outline"
                  className="hover:bg-slate-500 hover:text-white transition-all duration-400"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-gradient-to-br from-yellow-500 to-green-900 transition-all hover:from-green-900 hover:to-yellow-500 duration-400 mr-2">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                  src="img/logo.png"
                    // src={`${user.profile.profilePhoto}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex gap-4 ">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="img/logo.png"
                    //  src={`${user.profile.profilePhoto}`} 
                     />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-2 text-gray-600 ">
                  {user && user.role == "student" && (
                    <div className="flex w-fit items-center cursor-pointer">
                      <User2 />{" "}
                      <Button variant="link">
                        <Link to={"/profile"}>View Profile</Link>
                      </Button>{" "}
                    </div>
                  )}

                  <div className="flex w-fit items-center cursor-pointer">
                    <LogOut />{" "}
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
