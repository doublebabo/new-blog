import './MyButton.scss';
import React, {useState} from "react";

export default function MyButton(props: any) {
    return (
        <span className="mybutton">
             <button>
            <span>{props.name}</span>
            <div className="liquid"></div>
        </button>
        </span>
        );
}
