import React from 'react'
import $ from "./customInput.module.scss"

export default function CustomInput({ currentValue = undefined, label, type, id, placeholder, required, maxLength, onblur = (e) => { } }) {

  return <div>
    <label htmlFor={id}>{label}</label><br />
    <input
      className={$.input}
      type={type}
      id={id} name={id}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      defaultValue={currentValue ? currentValue : ""}
      onBlur={(e) => { onblur({ [id]: e.target.value }) }}
    />
    <br />
  </div>;
};