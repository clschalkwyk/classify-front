import React from 'react';

function  InputCheckbox(props) {
  const {id, name, label, value, change} = props;
  return (
      <div className="form-group row">
        <label className="col-form-label col-sm-2" htmlFor={id}>{label}</label>
        <div className="col-sm-6">
          <div className="form-check">
          <input type="checkbox" className="form-check-input"
                 id={id} name={name} value={value} checked={value}
                 onChange={event => change(event.target.checked)}
          />
          </div>
        </div>
      </div>
  )
}

export default InputCheckbox;