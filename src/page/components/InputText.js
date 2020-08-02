import React from 'react';

function  InputText(props) {
  const {id, name, label, value, change, type } = props;
  return (
      <div className="form-group row">
        <label className="col-form-label col-sm-2" htmlFor={id}>{label}</label>
        <div className="col-sm-6">
          <input type={type ?? "text"} id={id} name={name} className="form-control" value={value} onChange={(e) => change(e.target.value)}/>
        </div>
      </div>
  )
}

export default InputText;