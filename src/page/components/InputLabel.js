import React from 'react';

function  InputLabel(props) {
  const {id, label, value} = props;
  return (
      <div className="form-group row">
        <label className="col-form-label col-sm-2" htmlFor={id}>{label}</label>
        <div className="col-sm-6">
          {value}
        </div>
      </div>
  )
}

export default InputLabel;