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
    name: "Bruno Freitas Dornelas de Oliveira",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥇 1º lugar",
    photoUrl: "bruno-freitas.png",
  },
  {
    id: 2,
    name: "Daniel Augusto Mandira",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥈 2º lugar",
    photoUrl: "daniel-mandira.png",
  },
  {
    id: 3,
    name: "João Marcos Alecsandro Kirimis",
    team: "DSM-4",
    phase: "Python / Flask",
    position: "🥉 3º lugar",
    photoUrl: "joao-kirimis.png",
  },
];

const WinnersTable: React.FC = () => {
  return (
    <div className="overflow-x-auto flex items-center justify-center p-6">
      <div className="w-300 bg-[#181928] rounded-2xl shadow-lg p-6">
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
                <td className="py-3 px-4 font-medium text-gray-100">{winner.name}</td>
                <td className="py-3 px-4 font-medium text-gray-100">{winner.team}</td>
                <td className="py-3 px-4 text-blue-400 font-semibold">
                <div className="flex">
                    <img className="w-5 mr-2" src="/images/python-ico.png" alt="" />
                    {winner.phase}
                </div>
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
    </div>
  );
};

export default WinnersTable;
