import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillPlayFill } from "react-icons/bs";
import Editor from "@monaco-editor/react";

const Home = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section className=" bg-slate-400 h-screen">
      <div className="p-8 h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="rounded p-4 bg-white">
              <Editor
                height={"100%"}
                language="javascript"
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
            <div className="grid grid-rows-2 gap-4">
              <textarea
                className="w-full bg-white p-2 font-light text-sm h-full resize-none rounded-md"
                placeholder="Input"
              ></textarea>
              {loading && (
                <div className="w-full bg-white p-2 font-light text-sm h-full flex items-center justify-center rounded-md">
                  <ClipLoader />
                </div>
              )}
              {loading || (
                <div className="w-full bg-white p-2 font-light text-sm h-full rounded-md overflow-auto">
                  <pre>{result}</pre>
                </div>
              )}
            </div>
          </div>
          <button
            className="bg-green-700 px-4 py-2 text-white rounded-md font-medium text-sm mt-4 w-fit ml-auto hover:bg-green-800 flex items-center justify-center gap-1"
            onClick={onClickSubmit}
          >
            Run
            <BsFillPlayFill />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
