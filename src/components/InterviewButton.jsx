import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import database from "../../firebase";
import boilerplate from "../data/boilerplate";
import createId from "../utils/createRandomId";
import removeEscCharsFromCode from "../utils/removeEscCharFromCode";

const InterviewButton = () => {
  const navigate = useNavigate();

  const setInterview = async (id, code, input, result, selectedLanguage) => {
    await set(ref(database, "interviews/" + id), {
      code: JSON.stringify(code),
      input: input,
      result: result,
      selectedLanguage: selectedLanguage,
    });
  };

  const onClickInterviewMode = async () => {
    const id = createId();
    const codeToSend = removeEscCharsFromCode(boilerplate.cpp);
    await setInterview(id, codeToSend, "", "", {
      value: "cpp",
      label: "C++",
    });
    navigate(`/${id}`);
  };

  return (
    <button
      className="bg-[#1c2333] rounded-xl py-2 px-4 flex items-center justify-center gap-2 ml-auto"
      onClick={onClickInterviewMode}
    >
      Enter interview mode
    </button>
  );
};

export default InterviewButton;
