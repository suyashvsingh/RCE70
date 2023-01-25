import axios from "axios";

const runCode = async (code, selectedLanguage, input) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    code,
    input,
  });
  let reqOptions = {
    url: `/api/v1/code/exe-${selectedLanguage.value}/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  let response = await axios.request(reqOptions);
  return response;
};

export default runCode;
