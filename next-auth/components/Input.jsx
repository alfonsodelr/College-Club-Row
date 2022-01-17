import React from 'react'
import $ from './Input.module.scss'
function Input({ label = "Label" }) {
    return (
        <div className={$.group}>
            <input type="text" required />
            <span className={$.highlight} />
            <span className={$.bar} />
            <label>{label}</label>
        </div>
    );
}

export default Input
