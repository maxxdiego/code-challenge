import { useRouter } from "next/router";

type FooterProps = {
  totalInputs: number;
  solvedInputs: number;
  onRestart: () => void;
};

export default function Footer({
  totalInputs,
  solvedInputs,
  onRestart,
}: FooterProps) {
  const router = useRouter();

  const handleSubmit = () => {
    if (solvedInputs === totalInputs) {
      router.push("/congratulations");
    } else {
      alert(`Faltam ${totalInputs - solvedInputs} inputs para completar!`);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1E1E26] p-4 border-t border-gray-700 flex justify-between items-center">
      <span className="text-white">
        Progresso: {solvedInputs}/{totalInputs}
      </span>
      <div className="flex gap-2">
        <button hidden
          onClick={() => {
            onRestart();
          }}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          ⟳ Reiniciar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          ✓ Submeter código
        </button>
      </div>
    </footer>
  );
}
