import React, { useEffect } from "react";
import ClipboardJS from "clipboard";

interface CopyableTextareaProps {
    name: string;
    text: string;
}

const CopyableTextarea: React.FC<CopyableTextareaProps> = ({ name, text }) => {
    useEffect(() => {
        const clipboard = new ClipboardJS('.btn');
        return () => clipboard.destroy();
    }, []);

    return (
        <div className="CopyableTextarea">
            <textarea 
                readOnly 
                className="textarea" 
                onClick={e => (e.target as HTMLTextAreaElement).select()} 
                id={name} 
                value={text} 
            />
            <button 
                className="button btn primary is-fullwidth" 
                data-clipboard-target={`#${name}`}
            >
                复制
            </button>
        </div>
    )
}

export default CopyableTextarea
