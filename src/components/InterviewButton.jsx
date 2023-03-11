import random from "random";
import { useNavigate } from "react-router-dom";

const InterviewButton = () => {
  const navigate = useNavigate();

  const onClickInterviewMode = async () => {
    const id = random.int(0, 1000000).toString(36);
    navigate(`/${id}`);
  };

  return (
    <button
      className="bg-[#1c2333] rounded-xl py-2 px-4 flex items-center justify-center gap-2 ml-auto"
      onClick={onClickInterviewMode}
    >
      Interview mode
    </button>
  );
};
export default InterviewButton;
