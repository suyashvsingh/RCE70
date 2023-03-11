import fileDownload from "js-file-download";
import random from "random";
import { TbDownload } from "react-icons/tb";

const DownloadButton = ({ code, selectedLanguage }) => {
  const handleOnClickDownload = () => {
    const fileExtensions = {
      javascript: "js",
      python: "py",
      java: "java",
      c: "c",
      cpp: "cpp",
    };

    const fileName = `${random.int(0, 1000000)}.${
      fileExtensions[selectedLanguage.value]
    }`;

    fileDownload(code, fileName);
  };

  return (
    <button
      onClick={handleOnClickDownload}
      className="bg-green-700 flex-grow-0 px-4 py-2 text-white rounded-xl font-medium text-sm mt-4 w-fit hover:bg-green-800 flex items-center justify-center gap-1"
    >
      Download
      <TbDownload />
    </button>
  );
};

export default DownloadButton;
