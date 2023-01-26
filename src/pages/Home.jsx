import { useState } from "react";
import toast from "react-hot-toast";
import EditorComponent from "../components/EditorComponent";
import SelectComponent from "../components/SelectComponent";
import Loading from "../components/Loading";
import OuptutTextArea from "../components/OutputTextArea";
import InputTextArea from "../components/InputTextArea";
import RunButton from "../components/RunButton";
import runCode from "../utils/runCode";
import boilerplate from "../data/boilerplate";
import toastStyles from "../styles/toastStyle";

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "javascript",
    label: "JavaScript",
  });
  const [code, setCode] = useState(boilerplate[selectedLanguage.value]);

  const onClickSubmit = async () => {
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
    <div className="h-screen gap-1 p-3 grid grid-cols-2 grid-rows-[3em_calc(48%-3em)_calc(48%-3em)_3.5em] bg-[#0f1327]">
      <div className="flex gap-2 items-center col-span-2">
        <SelectComponent
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          setCode={setCode}
        />
      </div>
      <div className="h-full p-3 rounded-xl col-span-2 md:row-span-2 md:col-span-1 bg-[#1c2333]">
        <EditorComponent
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage}
        />
      </div>
      <InputTextArea input={input} setInput={setInput} />
      <div className="rounded-xl w-full h-full">
        {loading ? (
          <Loading />
        ) : (
          <OuptutTextArea result={result} error={error} />
        )}
      </div>
      <RunButton onClickSubmit={onClickSubmit} />
    </div>
  );
};

export default Home;
