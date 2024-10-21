import { fetchAllSymbols } from "@/services/fetchSymbols";
import { ListAllSymbols, ListSymbolsSelected } from "@/components/Sections";

export default async function Home() {
  const data = await fetchAllSymbols();

  return (
    <div className="p-4 grid gap-4 min-[600px]:grid-cols-2">
      <ListAllSymbols symbols={data} />
      <ListSymbolsSelected />
    </div>
  );
}
