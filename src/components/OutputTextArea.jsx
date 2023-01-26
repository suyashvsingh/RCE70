const OuptutTextArea = ({ result, error }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 rounded-xl w-full bg-[#1c2333] rounded-b-none border-b-2 border-b-[#0f1327] flex justify-between">
        <div className="font-semibold">Output</div>
        {error ? (
          <span className="text-red-500 font-semibold">
            Code execution failed
          </span>
        ) : (
          <span className="text-green-500 font-semibold">
            No errors detected
          </span>
        )}
      </div>
      <textarea
        className="p-3 rounded-xl w-full h-full resize-none bg-[#1c2333] rounded-t-none"
        readOnly
        placeholder="Output"
        defaultValue={result}
      />
    </div>
  );
};

export default OuptutTextArea;
