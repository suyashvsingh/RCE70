const removeEscCharsFromCode= (code) => {
  return code.replace(/\r/g, "");
};

export default removeEscCharsFromCode;
