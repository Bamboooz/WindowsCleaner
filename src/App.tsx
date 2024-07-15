import React, { useState } from "react";
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { LuCopy } from "react-icons/lu";

import Checkbox from "./components/Checkbox";
import windows from "./assets/windows.png";

const commandsMap = {
    "Clean recycle bin": "del /q /f /s %systemdrive%\\$Recycle.Bin\\*",
    "Clean downloads folder": "del /q /f /s %USERPROFILE%\\Downloads\\*",
    "Clean system temp folder": "del /q /f /s %systemdrive%\\Windows\\Temp\\*",
    "Clean application temp folder": "del /q /f /s %TEMP%\\*",
    "Run system file checker": "start cmd /k sfc /scannow",
    "Schedule disk checking utility after next reboot": "start cmd /k chkdsk C: /F /R /X",
};

const App: React.FC = () => {
    const [commands, setCommands] = useState<string[]>([]);

    const getCommand = () => commands.join(" && ");

    const copyCommand = async () => await writeText(getCommand());

    const change = (command: string) => {
        setCommands(prev => prev.includes(command) 
            ? prev.filter(c => c !== command) 
            : [...prev, command]);
    };

    const execute = async () => {
        await invoke("execute_command", { command: getCommand() });
    };

    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-between p-6 gap-6 bg-primary">
                <div className="flex items-center justify-center gap-6 shrink-0">
                    <img src={windows} className="h-16 w-16" />

                    <h1 className="text-text-primary text-[28px]">Windows Cleaner</h1>
                </div>

                <div className="w-full h-full bg-secondary rounded-md border flex flex-col items-start justify-center border-border p-6 gap-3">
                    {Object.entries(commandsMap).map(([label, command]) => (
                        <Checkbox text={label} onChange={() => change(command)} />
                    ))}
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                    <p className="text-text-primary text-[16px]">Current Command</p>

                    <div className="w-full h-10 bg-secondary flex items-center gap-3 justify-between overflow-auto px-3 rounded-lg border border-border">
                        {getCommand() === ""
                            ? <p className="text-text-secondary text-[12px]">Empty</p>
                            : <p className="text-text-primary text-[12px] font-mono whitespace-nowrap overflow-x-auto">{getCommand()}</p>
                        }

                        {commands.length !== 0 &&
                            <button onClick={copyCommand} className="shrink-0 flex items-center p-1 rounded-md justify-center hover:active:bg-tertiary">
                                <LuCopy className="text-text-primary text-[14px]" />
                            </button>
                        }
                    </div>
                </div>

                {commands.length === 0
                    ? <div title="Select at least one option to run" className="w-full h-10 cursor-pointer shrink-0 bg-secondary border-border rounded-lg flex items-center justify-center">
                        <p className="text-text-secondary text-[16px]">Run</p>
                    </div>
                    : <button onClick={execute} className="w-full h-10 shrink-0 bg-accent hover:bg-accent-hover hover:shadow-lg rounded-lg flex items-center justify-center">
                        <p className="text-text-primary text-[16px]">Run</p>
                    </button>
                }
            </div>
        </>
    );
};

export default App;
