import { NavLink } from "react-router-dom";
// import PopUpModal from "./PopUpModals";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import PopUpModal from "./PopUpModals";
import { CgLogOut } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showProfile = useAuth();

  const logoutAuth = useAuth();

  return (
    <div className=" static flex items-center justify-between w-full  sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4] bg-slate-200">
      <NavLink to="/">
        <div className=" font-semibold text-xl hover:cursor-pointer">
          Translator
        </div>
      </NavLink>

      <div className="service flex space-x-5 hover:cursor-pointer font-semibold items-center ">
        <NavLink to="/translator">
          <div className="flex items-center border py-2  rounded-md px-4 hover:bg-black hover:text-white ">
            Translator
          </div>
        </NavLink>

        <NavLink to="/contact">
          <div className="flex items-center border py-2  rounded-md px-4 hover:bg-black hover:text-white ">
            Contact us
          </div>
        </NavLink>
        <div>
          {showProfile?.user ? (
            <div
              className="profile flex items-center text-white bg-black  rounded-[100%]  text-xl px-1 py-1    "
              onClick={() => setModalIsOpen(true)}
            >
              {showProfile.user.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            ""
          )}
          <PopUpModal
            className="absolute top-[52px] right-4 rounded-lg py-8 px-1 shadow-lg  w-[200px] h-[300px] bg-slate-200"
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          >
            <div className=" text-xl rounded-md py-1   flex items-center justify-center hover:bg-black hover:text-white hover:cursor-pointer ">
              <CgProfile className=" mr-2 mt-1" />
              Profile
            </div>
            <div className=" text-xl rounded-md py-1   flex items-center justify-center hover:bg-black hover:text-white hover:cursor-pointer ">
              <CiSettings className=" mr-2 mt-1" />
              Setting
            </div>

            <div
              className=" text-xl rounded-md py-1   flex items-center justify-center hover:bg-black hover:text-white hover:cursor-pointer"
              onClick={() => {
                logoutAuth.Logout();
                setModalIsOpen(false);
              }}
            >
              <CgLogOut className=" mr-2 mt-1" />
              Logout
            </div>
          </PopUpModal>
        </div>
      </div>
    </div>
  );
};

export default Header;
