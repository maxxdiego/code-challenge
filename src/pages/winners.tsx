// pages/congratulations.tsx
import WinnersTable from "@/components/WinnersTable";
import { useRouter } from "next/router";

export default function Winners() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
      <span className="text-5xl">🏆</span> Confira os vencedores de desafios anteriores:
      </h1>
      <WinnersTable />
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg cursor-pointer"
      >
        Voltar ao início
      </button>
    </div>
  );
}
