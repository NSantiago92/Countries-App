import React from "react";
import CountryTag from "../CountryTag/CountryTag";

function CountrySelect({
  listRef, //to detect if focus is the input text and handle the submit
  countries, //countries list to populate datalist
  inputCountries, //current list of countries in the input to render the tags
  handleChange, //the parent handles the text-input through this function
  inputCountrySearchTerm,
  setInputs, //we need this to remove countries tags
}) {
  function killTag(id) {
    //when the tag kills itself we need to remove the country value from the form submission
    setInputs((prevInputs) => {
      const countryList = prevInputs.countryList.filter((idd) => idd !== id);
      return { ...prevInputs, countryList };
    });
  }

  return (
    <>
      <div
        className={
          inputCountries.length === 0 ? "invalid_input" : "input_field"
        }
      >
        <label htmlFor="countries">*Countries:</label>
        <input
          ref={listRef}
          id={"countrySearchTerm"}
          value={inputCountrySearchTerm}
          onChange={handleChange}
          list="countries"
          className="input_text"
        />
        <datalist id="countries">
          {countries.map(({ name, id }) => (
            <option value={name} key={id}></option>
          ))}
        </datalist>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {inputCountries.map((id) => {
          const { code, flagImg } = countries.find(({ id: i }) => i === id);
          return (
            <CountryTag
              key={id}
              id={id}
              code={code}
              flagImg={flagImg}
              killTag={killTag}
            />
          );
        })}
      </div>
    </>
  );
}

export default CountrySelect;
