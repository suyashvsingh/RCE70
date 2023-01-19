import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const onClickSubmit = async () => {
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
  };

  return (
    <div className="p-4 bg-slate-400 min-h-screen flex flex-col justify-between">
      <div className="flex basis-[50%] justify-between items-start">
        <Editor
          className="bg-white"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "50%",
            height: "80vh",
          }}
        />
        <div className="w-[100%] bg-white">{result}</div>
      </div>
      <button
        className="bg-green-700 px-4 py-2 text-white rounded-md font-medium text-sm mt-4 w-fit ml-auto"
        onClick={onClickSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default App;
