import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Names({placeholder, onChange, value, className}) {
    return (

        <div className={className}>
            <input placeholder={placeholder} onChange={onChange} value={value}></input>
        </div>
    )
}
