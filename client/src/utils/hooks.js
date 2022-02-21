import { useState, useEffect } from "react";

export const useValidation = (value, validators) => {
  const [ isEmpty, setIsEmpty ] = useState(true);
  const [ lengthError, setLengthError ] = useState(false);
  const [ emailError, setEmailError ] = useState(false);
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      if ( validators.hasOwnProperty(validator) )
        switch ( validator ) {
          case "require":
            value ? setIsEmpty(false) : setIsEmpty(true);
            break;
          case "email":
            const re =
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
            re.test(String(value).toLocaleLowerCase())
              ? setEmailError(false)
              : value ? setEmailError("Email not valid") : setEmailError(false);
            break;
          case "minLength":
            value.length < validators["minLength"]
              ? value
                ? setLengthError(`Must be min ${validators["minLength"]} character`)
                : setLengthError(false)
              : setLengthError(false);
            break;
          case "maxLength":
            value.length > validators["maxLength"]
              ? setLengthError(`Max length is ${validators["maxLength"]} character`)
              : setLengthError(false);
            break;
          default:
            break;
        }
    }
  }, [ value, validators ]);

  useEffect(() => {
    if (!isEmpty && !emailError && !lengthError)
      setIsValid(true);
    else
      setIsValid(false)
  }, [isEmpty, emailError, lengthError]);

  return {
    isEmpty,
    lengthError,
    emailError,
    isValid
  };
};

export const useInput = (initialValue, validators) => {
  const [ value, setValue ] = useState(initialValue);
  const [ isDirty, setIsDirty ] = useState(false);
  const valid = useValidation(value, validators);
  const onChange = e => {
    setValue(e);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    onBlur,
    reset,
    isDirty,
    ...valid
  };
};
