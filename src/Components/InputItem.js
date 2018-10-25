import React from 'react';

const InputItem = props => {
    return (
        <input type="number"
               name="id"
               className="input"
               value={props.inputValue}
               onChange={props.onInputChange}
        />
    );
};

export default InputItem;