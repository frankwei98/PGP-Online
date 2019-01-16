import React from "react";
import ClipboardJS from "clipboard";

new ClipboardJS('.btn')

const CopyableTextarea = ({ name, text }) => (
    <div className="CopyableTextarea">
        <textarea readOnly className="textarea" id={name} value={text} />
        <button className="button btn primary" data-clipboard-target={`#${name}`}>
            Copy to clipboard
        </button>
    </div>)



export default CopyableTextarea