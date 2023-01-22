import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillPlayFill } from "react-icons/bs";
import Editor from "@monaco-editor/react";

const Home = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const onClickSubmit = async () => {
    setLoading(true);
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      code,
    });

    let reqOptions = {
      url: "/api/v1/code/exe-js/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data.data);

    setResult(response.data.data);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-slate-400 gap-2 p-3 grid grid-cols-2 grid-rows-[3em_calc(48%-3em)_calc(48%-3em)_3.5em]">
      <div className="flex gap-2 items-center col-span-2">
        <div>Select language:</div>
        <div
          className="langauge-selector"
          onClick={() => setSelectedLanguage("c++")}
        >
          C++
        </div>
        <div
          className="langauge-selector"
          onClick={() => setSelectedLanguage("javascript")}
        >
          JavaScript
        </div>
        <div
          className="langauge-selector"
          onClick={() => setSelectedLanguage("python")}
        >
          Python
        </div>
        <div
          className="langauge-selector"
          onClick={() => setSelectedLanguage("go")}
        >
          Go
        </div>
      </div>
      <div className="h-full p-3 rounded bg-white col-span-2 md:row-span-2 md:col-span-1">
        <Editor
          height={"100%"}
          width={"100%"}
          language={selectedLanguage}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontFamily: "Fira Code",
            fontSize: 12,
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
      <textarea
        className="block p-3 rounded w-full h-full resize-none"
        placeholder="Input"
      ></textarea>
      <div className="bg-white rounded w-full h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <ClipLoader />
          </div>
        ) : (
          <pre className="overflow-auto p-3 h-full">{result}</pre>
        )}
      </div>
      <button
        onClick={onClickSubmit}
        className="bg-green-700 flex-grow-0 px-4 py-2 text-white rounded-md font-medium text-sm mt-4 w-fit ml-auto hover:bg-green-800 flex items-center justify-center gap-1 col-span-2"
      >
        Run
        <BsFillPlayFill />
      </button>
    </div>
  );
};

export default Home;
