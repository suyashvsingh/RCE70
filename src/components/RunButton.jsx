import { BsFillPlayFill } from "react-icons/bs";

const RunButton = ({ onClickSubmit }) => {
  return (
    <button
      onClick={onClickSubmit}
      className="bg-green-700 flex-grow-0 px-4 py-2 text-white rounded-xl font-medium text-sm mt-4 w-fit ml-auto hover:bg-green-800 flex items-center justify-center gap-1 col-span-2"
    >
      Run
      <BsFillPlayFill />
    </button>
  );
};

export default RunButton;
