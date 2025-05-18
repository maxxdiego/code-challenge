import { useRouter } from "next/router";
import Timer from "./Timer";

type FooterProps = {
  totalInputs: number;
  solvedInputs: number;
  onRestart: () => void;
};

export default function Footer({ totalInputs, solvedInputs, onRestart }: FooterProps) {
  const router = useRouter();

  const handleSubmit = () => {
    if (solvedInputs === totalInputs) {
      router.push("/congratulations");
    } else {
      alert(`Faltam ${totalInputs - solvedInputs} inputs para completar!`);
    }
  };

  return (
    <footer className="bottom-0 left-0 right-0 bg-[#1E1E26] p-2 sm:p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-2">
      <span className="text-white font-bold text-sm sm:text-lg">
        Progresso: {solvedInputs}/{totalInputs}
      </span>
      <div className="flex gap-2 items-center">
        <Timer />
        <button
          hidden
          onClick={onRestart}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-xs transition-colors"
        >
          ⟳ Reiniciar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-lg font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
        >
          Submeter código
        </button>
      </div>
    </footer>
  );
}