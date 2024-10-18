import { ListAllSymbols, ListSymbolsSelected } from "@/components/Sections";
import { fetchAllSymbols } from "@/services/fetchSymbols";

export default async function Home() {
  const data = await fetchAllSymbols();

  return (
    <div className="p-4 grid gap-4 min-[600px]:grid-cols-2">
      <ListAllSymbols symbols={data} />
      <ListSymbolsSelected />
    </div>
  );
}
