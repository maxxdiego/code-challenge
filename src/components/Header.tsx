export default function Header() {
  return (
    <header className="w-full bg-[#1E1E26] py-6 px-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="images/code-challenge-ico.png" alt="Code Challenge" className="w-12"/>
        {/* <h1 className="text-white font-mono text-lg">Revisão prática - LDW</h1> */}
        <h1 className="text-white font-mono text-lg">Code Challenge</h1>
        <h1 className="text-white font-mono text-lg">API Rest com Flask</h1>
        <span className="text-gray-300 text-sm">Resolva os enigmas do código!</span>
      </div>
    </header>
  );
}