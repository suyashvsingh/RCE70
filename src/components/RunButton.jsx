import { toast } from "react-hot-toast";
import { BsFillPlayFill } from "react-icons/bs";
import toastStyles from "../styles/toastStyle";
import runCode from "../utils/runCode";

const RunButton = ({
  setError,
  setLoading,
  code,
  selectedLanguage,
  input,
  setResult,
  buttonRef,
}) => {
  const onClickRun = async () => {
    setError(false);
    toast.dismiss();
    setLoading(true);
    try {
      const response = await runCode(code, selectedLanguage, input);
      if (response.data.status === true) {
        toast.success("Code executed", toastStyles);
        setResult(response.data.data);
      }
    } catch (error) {
      setError(true);
      toast.error("Code execution failed", toastStyles);
      setResult(error);
    }
    setLoading(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClickRun}
      className="bg-green-700 flex-grow-0 px-4 py-2 text-white rounded-xl font-medium text-sm mt-4 w-fit ml-auto hover:bg-green-800 flex items-center justify-center gap-1 col-span-2"
    >
      Run
      <BsFillPlayFill />
    </button>
  );
};

export default RunButton;
