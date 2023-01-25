import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillPlayFill } from "react-icons/bs";
import Select from "react-select";
import selectStyle from "../styles/selectStyle";
import languages from "../data/languages";
import EditorComponent from "../components/EditorComponent";
import runCode from "../utils/runCode";

const Home = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "js",
    label: "JavaScript",
  });

  const onClickSubmit = async () => {
    setLoading(true);
    try {
      const response = await runCode(code, selectedLanguage, input);
      setResult(response.data.data);
    } catch (error) {
      console.log(error);
      setResult(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen gap-1 p-3 grid grid-cols-2 grid-rows-[3em_calc(48%-3em)_calc(48%-3em)_3.5em] bg-[#0f1327]">
      <div className="flex gap-2 items-center col-span-2">
        <Select
          value={selectedLanguage}
          options={languages}
          formatOptionLabel={(language) => (
            <div className="flex gap-2 items-center ">
              <img
                src={`/src/images/${language.value}.png`}
                className="w-4 h-4"
              />
              <span>{language.label}</span>
            </div>
          )}
          onChange={(selectedOption) => setSelectedLanguage(selectedOption)}
          styles={selectStyle}
        />
      </div>
      <div className="h-full p-3 rounded-xl col-span-2 md:row-span-2 md:col-span-1 bg-[#1c2333]">
        <EditorComponent
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage}
        />
      </div>
      <textarea
        className="block p-3 rounded-xl w-full h-full resize-none bg-[#1c2333]"
        placeholder="Input"
        spellCheck="false"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div className="rounded-xl w-full h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full bg-[#1c2333] rounded-xl">
            <ClipLoader color="white" />
          </div>
        ) : (
          <textarea
            className="block p-3 rounded-xl w-full h-full resize-none bg-[#1c2333]"
            readOnly
            placeholder="Output"
            defaultValue={result}
          ></textarea>
        )}
      </div>
      <button
        onClick={onClickSubmit}
        className="bg-green-700 flex-grow-0 px-4 py-2 text-white rounded-xl font-medium text-sm mt-4 w-fit ml-auto hover:bg-green-800 flex items-center justify-center gap-1 col-span-2"
      >
        Run
        <BsFillPlayFill />
      </button>
    </div>
  );
};

export default Home;
