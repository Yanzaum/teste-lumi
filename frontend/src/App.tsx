import { RiSearchLine } from "@remixicon/react";
import { TextInput } from "@tremor/react";
import { useQuery } from "react-query";
import { invoiceService } from "./service/api/invoices";
import ThemeSwitch from "./components/ThemeSwitch";
import { useState } from "react";
import InvoicesTable from "./components/InvoicesTable";
import InvoicesCharts from "./components/InvoicesCharts";

export default function App() {
  const [search, setSearch] = useState<string>('')
  const [displaySearch, setDisplaySearch] = useState<string>('')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    data: invoices = [],
  } = useQuery({
    queryKey: ['invoices', search],
    queryFn: () => invoiceService.getInvoices(search),
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySearch(e.target.value)
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(setTimeout(() => {
      if (e.target.value.length === 10 || e.target.value.length === 0) setSearch(e.target.value)
    }, 500))
  }
  
  return (
    <main className="min-h-screen dark:bg-[#222]">
      <div className="container mx-auto py-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-black dark:text-white">Dashboard</h1>
              <p className="text-xl font-normal text-black dark:text-white/80">Visualize os dados em formato de dashboard</p>
            </div>
            <div className="flex flex-row gap-10 items-center">
              <TextInput
                className="w-full max-w-lg h-min"
                icon={RiSearchLine}
                placeholder="Pesquisar por número do cliente..."
                value={displaySearch}
                onChange={handleSearchChange}
              />
              <ThemeSwitch />
            </div>
          </div>

          <InvoicesCharts invoices={invoices} />

          <InvoicesTable invoices={invoices} />
        </div>
      </div>
    </main>
  )
}
