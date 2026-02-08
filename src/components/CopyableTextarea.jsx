import React from "react";
import ClipboardJS from "clipboard";

new ClipboardJS('.btn')

const CopyableTextarea = ({ name, text }) => (
    <div className="CopyableTextarea">
        <textarea readOnly className="textarea" onClick={e => e.target.select()} id={name} value={text} />
        <button className="button btn primary is-fullwidth" data-clipboard-target={`#${name}`}>
            复制
        </button>
    </div>)



export default CopyableTextarea