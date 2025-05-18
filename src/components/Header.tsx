import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#1E1E26] py-4 px-2 sm:px-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <img
          src="images/code-challenge-ico.png"
          alt="Code Challenge"
          className="w-10 hidden sm:block"
        />
        <h1 className="text-gray-200 font-mono text-sm sm:text-lg text-center">
          Code Challenge - <span className="text-gray-400 text-xs sm:text-sm">Resolva os enigmas do código!</span>
        </h1>
        <h1 className="text-gray-400 font-mono text-xs sm:text-md">
          Fase: <span className="text-gray-200">API Rest com Python / Flask</span>
        </h1>
        <Link href="/winners" className="text-white text-sm sm:text-lg"><span className="text-xl">🏆</span> Vencedores</Link>
      </div>
    </header>
  );
}