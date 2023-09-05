import { BarLoader } from "react-spinners";
// import useApi from "../Hooks/useApi";

const SuspenseLoader = () => {
  // const loaderService = useApi();

  return (
    <>
      <div className=" flex items-center justify-center h-[100vh]">
        <BarLoader loading />
      </div>
    </>
  );
};

export default SuspenseLoader;
