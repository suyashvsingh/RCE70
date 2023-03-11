import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import database from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import EditorComponent from "../components/EditorComponent";
import SelectComponent from "../components/SelectComponent";
import Loading from "../components/Loading";
import OuptutTextArea from "../components/OutputTextArea";
import InputTextArea from "../components/InputTextArea";
import RunButton from "../components/RunButton";
import boilerplate from "../data/boilerplate";
import ResetButton from "../components/ResetButton";
import DownloadButton from "../components/DownloadButton";

const Interview = () => {
  const { id } = useParams();

  const [initalLoadDone, setInitialLoadDone] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const buttonRef = useRef(null);

  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "javascript",
    label: "JavaScript",
  });

  const [code, setCode] = useState(boilerplate[selectedLanguage.value]);

  const addToDatabase = async () => {
    set(ref(database, "interviews/" + id), {
      code: code,
      input: input,
      result: result,
      selectedLanguage: selectedLanguage,
    });
  };

  const readFromDatabase = async () => {
    const interviewsRef = ref(database, "interviews/" + id);
    onValue(interviewsRef, async (snapshot) => {
      const data = await snapshot.val();
      setCode(await data.code);
      setInput(await data.input);
      setResult(await data.result);
      setSelectedLanguage({
        value: await data.selectedLanguage.value,
        label: await data.selectedLanguage.label,
      });
    });
  };

  const initialLoad = async () => {
    const interviewsRef = ref(database, "interviews/" + id);
    onValue(interviewsRef, async (snapshot) => {
      const exists = await snapshot.val();
      if (exists == null) {
        await addToDatabase();
        setInitialLoadDone(true);
      } else {
        await readFromDatabase();
        setInitialLoadDone(true);
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.altKey) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    if (initalLoadDone) {
      addToDatabase();
    }
  }, [code, input, result, selectedLanguage]);

  return (
    <div className="h-screen gap-1 p-3 grid grid-cols-2 grid-rows-[3em_calc(48%-3em)_calc(48%-3em)_3.5em] bg-[#0f1327]">
      <div className="flex gap-2 items-center col-span-2">
        <SelectComponent
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          fromInterviewMode={true}
          setCode={setCode}
        />
        <ResetButton
          setCode={setCode}
          setInput={setInput}
          setResult={setResult}
          setError={setError}
          selectedLanguage={selectedLanguage}
        />
        <div className="ml-auto">
          Connected : <span className="text-green-500 font-semibold">{id}</span>
        </div>
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
          <OuptutTextArea
            result={result}
            error={error}
            executionTime={executionTime}
          />
        )}
      </div>
      <DownloadButton code={code} selectedLanguage={selectedLanguage} />
      <RunButton
        buttonRef={buttonRef}
        setError={setError}
        setLoading={setLoading}
        code={code}
        selectedLanguage={selectedLanguage}
        input={input}
        setResult={setResult}
        setExecutionTime={setExecutionTime}
      />
    </div>
  );
};

export default Interview;
