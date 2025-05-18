// pages/congratulations.tsx
import { useRouter } from "next/router";

export default function Congratulations() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img src="/images/winner.png" alt="Desafio completo" className="w-90 mb-10" />
      <h1 className="text-3xl font-bold text-center mb-6">
        🎉 Parabéns! Você completou todos os desafios! 🎉
      </h1>
      <h1 className="text-md font-medium text-center mb-6">
        Dessa vez, você desvendou todos os enigmas do código. Mas será que teria
        o mesmo sucesso se tentasse outra vez?
      </h1>
      <div className="flex justify-around w-130">
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-lg cursor-pointer"
        >
          ⟳ Jogar novamente!
        </button>
        <button
          onClick={() => router.push("/winners")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg cursor-pointer"
        >
          <span className="text-2xl">🏆</span> Vencedores do desafio
        </button>
      </div>
    </div>
  );
}
