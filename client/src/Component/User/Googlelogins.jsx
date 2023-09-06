import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const Googlelogin = () => {
  const [pic, setpic] = useState("");

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            const decoded = jwt_decode(credentialResponse.credential);
            console.log("This is decoded", decoded);

            console.log("this is pic", decoded.picture);
            setpic(decoded.picture);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <img src={pic} alt="" />
      </div>
    </>
  );
};

export default Googlelogin;
