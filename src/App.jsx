import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
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
      url: "http://157.245.104.238/v1/code/exe-JS",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    setResult(response.data.data);
    setLoading(false);
  };

  return (
    <section className=" bg-slate-400 h-screen">
      <div className="p-8 h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-4 h-full">
            <Editor
              className="bg-white rounded-md"
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
            <div className="grid grid-rows-2 gap-4">
              <textarea
                className="w-full bg-white p-2 font-light text-sm h-full resize-none rounded-md "
                placeholder="Input"
              ></textarea>
              {loading && (
                <div className="w-full bg-white p-2 font-light text-sm h-full flex items-center justify-center rounded-md">
                  <ClipLoader />
                </div>
              )}
              {loading || (
                <div className="w-full bg-white p-2 font-light text-sm h-full rounded-md">
                  {result}
                </div>
              )}
            </div>
          </div>
          <button
            className="bg-green-700 px-4 py-2 text-white rounded-md font-medium text-sm mt-4 w-fit ml-auto"
            onClick={onClickSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default App;
