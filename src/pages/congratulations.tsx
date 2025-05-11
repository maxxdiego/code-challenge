// pages/congratulations.tsx
import { useRouter } from 'next/router'

export default function Congratulations() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎉 Parabéns! Você completou todos os desafios! 🎉
      </h1>
      <button
        onClick={() => router.push('/')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-lg"
      >
        Voltar ao início
      </button>
    </div>
  )
}