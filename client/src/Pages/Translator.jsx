import { RxCross1 } from "react-icons/rx";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsFillRecordBtnFill } from "react-icons/bs";
import { useState } from "react";

const Translator = () => {
  const [showVoice, setShowVoice] = useState(false);
  const [textChange, setTextChange] = useState("");
  return (
    <div className="  bg-slate-200 h-full w-full  ">
      <div className=" gap-12">
        <div className="  flex flex-col items-center justify-center   gap-4  ">
          <div className=" relative  bg-slate-200  h-[250px] w-[60%] border border-black  shadow-lg rounded-md">
            <RxCross1 className="absolute top-2 right-2 cursor-pointer hover:bg-slate-300  hover:rounded-md" />

            <div className=" h-[inherit] py-3 px-3">{textChange}</div>

            {!showVoice ? (
              <MdOutlineKeyboardVoice
                className="absolute bottom-2 left-4 cursor-pointer h-[30px] w-[30px] hover:bg-slate-300   hover:rounded-md"
                onClick={() => setShowVoice(!showVoice)}
              />
            ) : (
              <span className=" ">
                <BsFillRecordBtnFill
                  color="green"
                  className="absolute  bottom-2 left-4 cursor-pointer  h-[30px] w-[30px] hover:bg-slate-300   hover:rounded-md"
                  onClick={() => setShowVoice(!showVoice)}
                />{" "}
              </span>
            )}
          </div>
          <div className=" flex items-center justify-center bg-slate-200 shadow-lg  h-[450px] w-[70%] border rounded-md border-black   ">
            <textarea
              className=" h-[inherit] w-full bg-slate-200 px-3 py-8 "
              rows={10}
              onChange={(e) => setTextChange(e.target.value)}
              placeholder="Type here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
