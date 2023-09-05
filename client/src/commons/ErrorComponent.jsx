// import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  // const error = useRouteError();

  return (
    <>
      {" "}
      <div className=" flex items-center justify-center h-[100vh] text-[40px]">
        <div>Error while loading this page.</div>
      </div>
    </>
  );
};

export default ErrorComponent;
