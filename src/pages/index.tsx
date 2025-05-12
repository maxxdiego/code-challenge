import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import fileStructure from "@/data/fileStructure";
import fileContents from "@/data/fileContents";
import Header from "@/components/Header";

// Carrega o CodeViewer apenas no lado do cliente
const CodeViewer = dynamic(() => import("@/components/CodeViewer"), {
  ssr: false,
  loading: () => <div className="p-4">Carregando editor de código...</div>,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [selectedFile, setSelectedFile] = useState(fileStructure[0]);
  const [validatedInputs, setValidatedInputs] = useState<
    Record<string, Record<string, string>>
  >({});
  const [maskedCode, setMaskedCode] = useState<Record<string, string[]>>({});
  const [totalInputs, setTotalInputs] = useState(0);
  const [solvedInputs, setSolvedInputs] = useState(0);
  // const [resetInputs, setResetInputs] = useState(false);

  // Gera o código mascarado apenas no cliente
  const generateMaskedCode = useCallback((content: string) => {
    const lines = content.split("\n");
    return lines.map((line) => {
      if (line.trim().length > 0 && Math.random() < 0.2) {
        return line.replace(/\b\w+\b/g, (word) => {
          return Math.random() < 0.3 ? `__INPUT__${word}__` : word;
        });
      }
      return line;
    });
  }, []);

  // Inicializa o estado apenas no cliente
  useEffect(() => {
    setIsClient(true);

    const initialMaskedCode: Record<string, string[]> = {};
    let total = 0;

    Object.keys(fileContents).forEach((file) => {
      initialMaskedCode[file] = generateMaskedCode(fileContents[file]);
      initialMaskedCode[file].forEach((line) => {
        if (line.includes("__INPUT__")) {
          total += (line.match(/__INPUT__/g) || []).length;
        }
      });
    });

    setMaskedCode(initialMaskedCode);
    setTotalInputs(total);
  }, [generateMaskedCode]);

  // Atualiza a contagem de inputs resolvidos globalmente
  useEffect(() => {
    let solved = 0;
    Object.values(validatedInputs).forEach((fileInputs) => {
      solved += Object.keys(fileInputs).length;
    });
    setSolvedInputs(solved);
  }, [validatedInputs]);

  const handleValidation = useCallback(
    (file: string, key: string, value: string) => {
      setValidatedInputs((prev) => ({
        ...prev,
        [file]: { ...prev[file], [key]: value },
      }));
    },
    []
  );

  // const handleRestart = useCallback(() => {
  //   if (
  //     window.confirm(
  //       "Tem certeza que deseja reiniciar? Todo o progresso será perdido."
  //     )
  //   ) {
  //     const newMaskedCode: Record<string, string[]> = {};
  //     let total = 0;

  //     Object.keys(fileContents).forEach((file) => {
  //       newMaskedCode[file] = generateMaskedCode(fileContents[file]);
  //       newMaskedCode[file].forEach((line) => {
  //         if (line.includes("__INPUT__")) {
  //           total += (line.match(/__INPUT__/g) || []).length;
  //         }
  //       });
  //     });

  //     setMaskedCode(newMaskedCode);
  //     setValidatedInputs({});
  //     setTotalInputs(total);
  //     setSolvedInputs(0);
  //     setResetInputs((prev) => !prev); // Dispara a limpeza
  //   }
  // }, [generateMaskedCode]);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando aplicação...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* Container principal ajustado */}
      <div className="flex flex-1 overflow-hidden">
        {" "}
        {/* pt-16 para compensar a altura do header */}
        <Sidebar structure={fileStructure} onSelect={setSelectedFile} />
        <main className="flex-1 overflow-auto">
          {selectedFile && maskedCode[selectedFile] && (
            <CodeViewer
              file={selectedFile}
              maskedCode={maskedCode[selectedFile]}
              validatedInputs={validatedInputs[selectedFile] || {}}
              onValidation={handleValidation}
              // resetInputs={resetInputs} // Passa a flag de reset
            />
          )}
        </main>
      </div>

      <Footer
        totalInputs={totalInputs}
        solvedInputs={solvedInputs}
        // onRestart={handleRestart}
      />
    </div>
  );
}
