import React, { useState, useEffect } from "react";

type CodeViewerProps = {
  file: string;
  maskedCode: string[];
  validatedInputs: Record<string, string>;
  onValidation: (file: string, key: string, value: string) => void;
  resetInputs: boolean; // Nova prop
};

export default function CodeViewer({
  file,
  maskedCode,
  validatedInputs,
  onValidation,
  resetInputs // Recebe a prop
}: CodeViewerProps) {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  // Efeito para limpar os inputs quando resetInputs mudar
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
    <div className="font-mono bg-[#13141F] text-[#f8f8f2] p-6 rounded shadow overflow-x-auto mb-20 text-sm">
      <div className="relative">
        {/* Coluna de numeração - ajuste a largura conforme necessário */}
        <div className="absolute left-0 top-0 h-full w-8 select-none text-right pr-2 text-gray-500 border-r border-gray-700 space-y-[0.4rem]">
          {maskedCode.map((_, index) => (
            <div
              key={`line-${index}`}
              className="h-6 leading-6" // Ajuste a altura conforme seu line-height
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Conteúdo do código - ajuste o padding-left para corresponder à largura da numeração */}
        <div className="pl-10 space-y-[0.4rem] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {maskedCode.map((line, i) => (
            <div key={`code-${i}`} className="flex h-6 leading-6">
              <div className="whitespace-pre">
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
                        className="inline-flex items-baseline mx-1"
                      >
                        <input
                          value={userInputs[inputKey] || ""}
                          onChange={(e) =>
                            handleChange(inputKey, e.target.value)
                          }
                          className="border-b border-gray-500 w-32 text-green-500 bg-gray-800/50 px-1 focus:outline-none focus:border-green-500"
                          spellCheck="false"
                        />
                        <button
                          className="ml-2 text-green-600 hover:text-green-700 transition-colors cursor-pointer font-extrabold"
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
