import Select from "react-select";
import selectStyle from "../styles/selectStyle";
import languages from "../data/languages";
import boilerplate from "../data/boilerplate";

const SelectComponent = ({
  selectedLanguage,
  setSelectedLanguage,
  fromInterviewMode = false,
  setCode,
}) => {
  return (
    <Select
      value={selectedLanguage}
      options={languages}
      formatOptionLabel={(language) => (
        <div className="flex gap-2 items-center ">
          <img src={`images/${language.value}.png`} className="w-4 h-4" />
          <span>{language.label}</span>
        </div>
      )}
      onChange={(selectedOption) => {
        setSelectedLanguage(selectedOption);
        if (fromInterviewMode) {
          setCode(boilerplate[selectedOption.value]);
        }
      }}
      styles={selectStyle}
    />
  );
};

export default SelectComponent;
