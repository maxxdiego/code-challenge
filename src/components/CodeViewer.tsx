import React, { useState, useEffect } from "react";

type CodeViewerProps = {
  file: string;
  maskedCode: string[];
  validatedInputs: Record<string, string>;
  onValidation: (file: string, key: string, value: string) => void;
  resetInputs: boolean;
};

export default function CodeViewer({
  file,
  maskedCode,
  validatedInputs,
  onValidation,
  resetInputs,
}: CodeViewerProps) {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setUserInputs({});
  }, [resetInputs]);

  const handleChange = (key: string, value: string) => {
    setUserInputs({ ...userInputs, [key]: value });
  };

  const handleValidation = (key: string, original: string) => {
    if (userInputs[key] === original) {
      onValidation(file, key, original);
      alert("Correto!");
    } else {
      alert("Tente novamente!");
    }
  };

  return (
    <div className="font-mono bg-[#13141F] text-[#f8f8f2] p-4 rounded shadow overflow-x-auto mb-20 text-[0.75rem]">
      <div className="relative w-max min-w-full">
        {/* Coluna de números */}
        <div className="absolute left-0 top-0 h-full w-6 text-right pr-1 text-gray-500 border-r border-gray-700 space-y-[0.3rem] select-none">
          {maskedCode.map((_, index) => (
            <div key={`line-${index}`} className="h-5 leading-5">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Código com inputs */}
        <div className="pl-8 space-y-[0.3rem] text-[0.75rem]">
          {maskedCode.map((line, i) => (
            <div key={`code-${i}`} className="flex h-5 leading-5 flex-wrap">
              <div className="whitespace-pre-wrap break-words">
                {line.split(/(__INPUT__\w+__)/g).map((part, j) => {
                  if (part.startsWith("__INPUT__")) {
                    const original = part.replace(/__INPUT__|__/g, "");
                    const inputKey = `${i}-${j}`;

                    return validatedInputs[inputKey] ? (
                      <span
                        key={`correct-${j}`}
                        className="text-green-400 bg-green-900/30 px-1 rounded"
                      >
                        {original}
                      </span>
                    ) : (
                      <span
                        key={`input-${j}`}
                        className="inline-flex flex-wrap items-center gap-1 mx-1"
                      >
                        <input
                          value={userInputs[inputKey] || ""}
                          onChange={(e) => handleChange(inputKey, e.target.value)}
                          className="border-b border-gray-500 w-24 text-green-500 bg-gray-800/50 px-1 py-0.5 focus:outline-none focus:border-green-500 text-[0.7rem]"
                          spellCheck="false"
                        />
                        <button
                          className="text-green-500 hover:text-green-700 bg-gray-800 hover:bg-gray-300 transition-colors cursor-pointer border border-green-700 rounded-sm w-5 h-5 text-xs font-bold flex items-center justify-center"
                          onClick={() => handleValidation(inputKey, original)}
                          aria-label="Validar resposta"
                        >
                          ✓
                        </button>
                      </span>
                    );
                  }
                  return <span key={`text-${j}`}>{part}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}