import React, { useState } from "react";

interface CheckboxProps {
    text: string;
    onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, onChange }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const onChecked = () => {
        setChecked(!checked)
        onChange(checked);
    };

    return (
        <>
            <button onClick={onChecked} className="flex items-center justify-center gap-3 text-text-primary text-[14px]">
                <div className="w-6 h-6 bg-tertiary rounded-md flex items-center justify-center">
                    {checked &&
                        <p>✓</p>
                    }
                </div>

                <p>{text}</p>
            </button>
        </>
    );
};

export default Checkbox;
