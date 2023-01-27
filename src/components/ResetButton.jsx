import toast from "react-hot-toast";
import boilerplate from "../data/boilerplate";
import { TbArrowBackUp } from "react-icons/tb";
import toastStyles from "../styles/toastStyle";

const ResetButton = ({
  setCode,
  setInput,
  setResult,
  setError,
  selectedLanguage,
}) => {
  const onClickReset = () => {
    toast.dismiss();
    setCode(boilerplate[selectedLanguage.value]);
    setInput("");
    setResult("");
    setError(false);
    toast.success("Reset Successful", toastStyles);
  };

  return (
    <button
      className="bg-[#1c2333] rounded-xl py-2 px-4 flex items-center justify-center gap-2"
      onClick={onClickReset}
    >
      <TbArrowBackUp size={20} />
      Reset
    </button>
  );
};
export default ResetButton;
