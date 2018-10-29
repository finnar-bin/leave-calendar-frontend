import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  prependText,
  size,
  type,
  otherClasses,
  changeAction,
  focus,
  value,
  name,
  placeholder
}) => {
  let inputSize, toFocus;
  switch (size) {
    case "large":
      inputSize = "input-group-lg";
      break;

    case "small":
      inputSize = "input-group-sm";
      break;

    default:
      inputSize = "input-group";
      break;
  }

  if (focus) {
    toFocus = "autofocus";
  }

  return (
    <div className={`input-group ${inputSize} ${otherClasses}`}>
      <div className="input-group-prepend">
        <span className="input-group-text">{prependText}</span>
      </div>
      <input
        onChange={changeAction}
        type={type}
        value={value}
        className="form-control"
        autoFocus={toFocus}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

InputGroup.propTypes = {
  prependText: PropTypes.string,
  size: PropTypes.oneOf(["large", "small"]),
  type: PropTypes.string,
  otherClasses: PropTypes.string,
  changeAction: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  focus: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text",
  focus: false
};

export default InputGroup;
