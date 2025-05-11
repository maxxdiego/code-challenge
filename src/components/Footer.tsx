import { useRouter } from 'next/router'

type FooterProps = {
  totalInputs: number
  solvedInputs: number
  onRestart: () => void
}

export default function Footer({ totalInputs, solvedInputs, onRestart }: FooterProps) {
  const router = useRouter()

  const handleSubmit = () => {
    if (solvedInputs === totalInputs) {
      router.push('/congratulations')
    } else {
      alert(`Faltam ${totalInputs - solvedInputs} inputs para completar!`)
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 border-t flex justify-between items-center">
      <span className="text-gray-700">
        Progresso: {solvedInputs}/{totalInputs}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onRestart}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reiniciar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submeter código
        </button>
      </div>
    </footer>
  )
}