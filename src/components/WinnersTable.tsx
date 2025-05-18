import React from "react";

type Winner = {
  id: number;
  name: string;
  team: string;
  phase: string;
  position: string;
  photoUrl: string;
};

const winners: Winner[] = [
  {
    id: 1,
    name: "Pedro Henrique e Luiz Ricardo",
    team: "DSM-3",
    phase: "API Rest - Node.js",
    position: "🥇 1º lugar",
    photoUrl: "pedro-henrique-luiz-ricardo.jpeg",
  },
  {
    id: 2,
    name: "Diego e Vitor Mendes",
    team: "DSM-3",
    phase: "API Rest - Node.js",
    position: "🥈 2º lugar",
    photoUrl: "diego-vitor-mendes.jpeg",
  },
  {
    id: 3,
    name: "Lucas Gomes e Pedro Venâncio",
    team: "DSM-3",
    phase: "API Rest - Node.js",
    position: "🥉 3º lugar",
    photoUrl: "lucas-gomes-pedro-venancio.jpeg",
  },
  {
    id: 4,
    name: "Bruno Freitas Dornelas de Oliveira",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥇 1º lugar",
    photoUrl: "bruno-freitas.png",
  },
  {
    id: 5,
    name: "Daniel Augusto Mandira",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥈 2º lugar",
    photoUrl: "daniel-mandira.png",
  },
  {
    id: 6,
    name: "João Marcos Alecsandro Kirimis",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥉 3º lugar",
    photoUrl: "joao-kirimis.png",
  },
];

const WinnersTable: React.FC = () => {
  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-6xl bg-[#181928] rounded-2xl shadow-lg p-4">
        {/* Tabela para telas médias ou maiores */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-400 uppercase text-sm border-b">
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4">Nome:</th>
                <th className="py-3 px-4">Turma:</th>
                <th className="py-3 px-4">Fase:</th>
                <th className="py-3 px-4">Classificação:</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr
                  key={winner.id}
                  className="border-b hover:bg-[#13141F] transition duration-150"
                >
                  <td className="py-3 px-4">
                    <img
                      src={`/images/winners/${winner.photoUrl}`}
                      alt={winner.name}
                      className="w-20 h-25 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-100">
                    {winner.name}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-100">
                    {winner.team}
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-semibold">
                    {winner.phase}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block text-white text-md font-semibold px-2 py-1">
                      {winner.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Layout em cards para telas pequenas */}
        <div className="sm:hidden flex flex-col gap-4">
          {winners.map((winner) => (
            <div
              key={winner.id}
              className="bg-[#13141F] rounded-xl p-4 shadow-md flex flex-col sm:flex-row"
            >
              <div className="flex justify-center mb-4 sm:mb-0">
                <img
                  src={`/images/winners/${winner.photoUrl}`}
                  alt={winner.name}
                  className="w-24 h-28 object-cover rounded-md"
                />
              </div>
              <div className="text-white space-y-1 text-sm">
                <div>
                  <span className="font-semibold text-gray-400">Nome: </span>
                  {winner.name}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Turma: </span>
                  {winner.team}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Fase: </span>
                  <span className="text-blue-400">{winner.phase}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-400">
                    Classificação:{" "}
                  </span>
                  {winner.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersTable;
