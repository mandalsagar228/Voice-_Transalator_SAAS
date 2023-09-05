import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const loginButtonAuth = useAuth();
  return (
    <>
      <div className="main  flex items-center justify-center h-[calc(100vh-60px)] flex-col bg-slate-200">
        <div className="character text-[44px] font-semibold">
          Translate your voice in real time
        </div>
        {loginButtonAuth?.user ? null : (
          <button
            onClick={() => navigate("/login")}
            className=" flex items-center border py-2  rounded-md px-4 hover:bg-black hover:text-white"
          >
            Login to translate <FaArrowRightToBracket className=" ml-2" />
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
