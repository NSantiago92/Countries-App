import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchCountry } from "../../redux/actions";
import { postActivity } from "../../utils/postActivity";
import CountrySelect from "../CountrySelect/CountrySelect";
import SubmitPopUp from "../SubmitPopUp/SubmitPopUp";
import "./CreateActivity.css";

const inputsCheck = {
  name: (n) => {
    return n.replace(/[^ñ()0-9a-zA-Z\s,-]/g, "").slice(0, 30);
  },
  duration: (n) => {
    const newN = n.replace(/[^0-9]/g, "");
    return newN > 999 ? 999 : newN;
  },
  countrySearchTerm: (c) => c.replace(/[^çÅ()a-zA-Z\s,-]/g, ""),
};
const initialInputs = {
  name: "",
  difficulty: 1,
  duration: 0,
  season: "Spring",
  countrySearchTerm: "",
  countryList: [],
};

function CreateActivity() {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const countries = useSelector((state) =>
    state.countries.map(({ id, name, code, flagImg }) => {
      return { id, name, code, flagImg };
    })
  );

  const [inputs, setInputs] = useState(initialInputs);
  const [completed, setCompleted] = useState(false);
  const [submit, setSubmit] = useState({ error: false, submitted: false });

  function handleChange(e) {
    const { id, value } = e.target;
    const newValue = inputsCheck[id] ? inputsCheck[id](value) : value;
    setInputs((prevI) => {
      return { ...prevI, [id]: newValue };
    });
  }
  function handleDifficulty(e) {
    //needs a custom function because input-checkbox values is on|off
    setInputs((prevI) => {
      return { ...prevI, difficulty: e.target.id };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //we handle 2 submits, this is submiting new countries to the inputs list.
    if (listRef.current === document.activeElement) {
      const { countrySearchTerm } = inputs;
      //we check if the input actually matches with a country name
      const country =
        countries.find(
          ({ name }) => name.toLowerCase() === countrySearchTerm.toLowerCase()
        ) ||
        countries.find(({ name }) =>
          name.toLowerCase().includes(countrySearchTerm.toLowerCase())
        );
      if (country) {
        //if it does, we check that it isn't already added and then add the country to the inputs
        const { id } = country;
        if (inputs.countryList.find((c) => c === id) === undefined) {
          setInputs((prevInputs) => {
            return {
              ...prevInputs,
              countrySearchTerm: "",
              countryList: [...prevInputs.countryList, id],
            };
          });
        }
      }
      return;
    }
    //this is submitting the activity to backend and rendering the pop up
    if (completed) {
      const {
        name,
        difficulty,
        duration,
        season,
        countryList: countries,
      } = inputs;
      postActivity({ name, difficulty, duration, season, countries })
        .then(() => {
          setSubmit({ error: false, submitted: true });
        })
        .catch(() => {
          setSubmit({ error: true, submitted: true });
        });
      setInputs(initialInputs);
    }
  }

  useEffect(() => {
    //we need to load all countries, without filters, to populate the countries dataList (CountrySelect.js)
    dispatch(searchCountry());
  }, [dispatch]);

  useEffect(() => {
    if (
      inputs.name.trim() === "" ||
      inputs.duration === "" ||
      inputs.countryList.length === 0
    ) {
      setCompleted(false);
    } else setCompleted(true);
  }, [inputs]);

  return (
    <>
      <div className="add_activity">
        <div className="form_shell">
          <div className="back_btn">
            <Link to="/home">{"< Back"}</Link>
          </div>
          <form onSubmit={handleSubmit} className="input_form">
            <div
              className={
                inputs.name.trim() === "" ? "invalid_input" : "input_field"
              }
            >
              <label htmlFor="name">*Name:</label>
              <input
                id="name"
                type="text"
                onChange={handleChange}
                value={inputs.name}
                className="input_text"
              />
            </div>
            <div
              className={
                inputs.duration === "" ? "invalid_input" : "input_field"
              }
            >
              <label htmlFor="duration">*Duration</label>
              <input
                type="text"
                id="duration"
                onChange={handleChange}
                value={inputs.duration}
                className="input_text"
              />
              <span> days</span>
            </div>

            <div className="input_field">
              <label htmlFor="season">Season:</label>
              <select
                id="season"
                onChange={handleChange}
                value={inputs.season}
                className="input_text"
              >
                <option value="Spring" key="Spring">
                  Spring
                </option>
                <option value="Summer" key="Summer">
                  Summer
                </option>
                <option value="Autumn" key="Autumn">
                  Autumn
                </option>
                <option value="Winter" key="Winter">
                  Winter
                </option>
              </select>
            </div>
            <div className="input_field">
              <span>Difficulty:</span>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <label
                    key={i}
                    hidden
                    htmlFor={i}
                    className="checkbox_container"
                  >
                    <input
                      type="checkbox"
                      id={i}
                      name={i}
                      onChange={handleDifficulty}
                      checked={inputs.difficulty >= i}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
            <CountrySelect
              listRef={listRef}
              countries={countries}
              handleChange={handleChange}
              inputCountrySearchTerm={inputs.countrySearchTerm}
              inputCountries={inputs.countryList}
              setInputs={setInputs}
            />

            <input
              className={completed ? "submit_btn" : "invalid_submit_btn"}
              type="submit"
              value="Submit"
            />
          </form>
          <span className={completed ? "obligatory" : "invalid_obligatory"}>
            (* obligatory)
          </span>
        </div>
      </div>
      {submit.submitted && (
        <SubmitPopUp error={submit.error} setSubmit={setSubmit} />
      )}
    </>
  );
}

export default CreateActivity;
