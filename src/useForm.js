import React, { useState } from "react";
import { omit } from "lodash";

const useForm = () => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "title":
        if (value.length <= 4) {
          // we will set the error state

          setErrors({
            ...errors,
            username: "Name must have 5 letters",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "title");
          setErrors(newObj);
        }
        break;

      case "rating":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid Rating",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      //   callback();
    } else {
      alert("There is an Error!");
    }
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
