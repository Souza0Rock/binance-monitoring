import React from "react";

export const ListSymbolsSelected: React.FC = () => {
  return (
    <main className="p-2 border-solid border-2 overflow-x-auto border-sky-500">
      <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left min-w-[140px] text-black bg-[#f1f4ff]">
              Nome
            </th>
            <th className="px-3 py-2 text-left min-w-[150px] text-black bg-[#f1f4ff]">
              Celular
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Líder
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Célula
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Pastor
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                sadasd
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                awdas
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                swqsqws
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                Ssqs
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                asa
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
