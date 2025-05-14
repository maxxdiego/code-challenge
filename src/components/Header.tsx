import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#1E1E26] py-6 px-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img
          src="images/code-challenge-ico.png"
          alt="Code Challenge"
          className="w-12"
        />
        <h1 className="text-gray-200 font-mono text-lg">
          Code Challenge -{" "}
          <span className="text-gray-400 text-sm">
            Resolva os enigmas do código!
          </span>
        </h1>
        <h1 className="text-gray-400 font-mono text-md">
          Fase: <span className="text-gray-200">API Rest com Flask / Python</span>
        </h1>
        <Link href="/winners"><span className="text-white text-lg"><span className="text-2xl">🏆</span> Vencedores</span></Link>
      </div>
    </header>
  );
}
