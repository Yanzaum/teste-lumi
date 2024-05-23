import { RiSearchLine } from "@remixicon/react";
import { BarChart, Card, TextInput } from "@tremor/react";
import { useQuery } from "react-query";
import { invoiceService } from "./service/api/invoices";
import ThemeSwitch from "./components/ThemeSwitch";
import { useMemo, useState } from "react";
import getColorsTremor from "./utils/getColorsTremor";

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

  const eletricalPowerConsumptionkWh = useMemo(() => {
    const groupedData: { [key: string]: { [key: string]: number } } = invoices.reduce((acc: { [key: string]: { [key: string]: number } }, invoice) => {
      const { reference, eletricPower, eletricSCEEE, customerNumber } = invoice;
      const consumption = (eletricPower?.kWh || 0) + (eletricSCEEE?.kWh || 0);
      
      if (!acc[reference]) {
        acc[reference] = {};
      }
  
      acc[reference][customerNumber] = (acc[reference][customerNumber] || 0) + consumption;
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      ...data
    }));
  }, [invoices]);
  const eletricalPowerConsumptionKeys = useMemo(() => {
    return Object.keys(eletricalPowerConsumptionkWh[0] || {}).filter(key => key !== 'date');
  }, [eletricalPowerConsumptionkWh]);

  const compensatedEnergykWh = useMemo(() => {
    const groupedData: { [key: string]: { [key: string]: number } } = invoices.reduce((acc: { [key: string]: { [key: string]: number } }, invoice) => {
      const { reference, eletricGDI, customerNumber } = invoice;
      const consumption = eletricGDI?.kWh || 0;
      
      if (!acc[reference]) {
        acc[reference] = {};
      }
  
      acc[reference][customerNumber] = (acc[reference][customerNumber] || 0) + consumption;
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      ...data
    }));
  }, [invoices]);
  const compensatedEnergyKeys = useMemo(() => {
    return Object.keys(compensatedEnergykWh[0] || {}).filter(key => key !== 'date');
  }, [compensatedEnergykWh]);

  const totalValueWithoutGD = useMemo(() => {
    const groupedData: { [key: string]: { [key: string]: number } } = invoices.reduce((acc: { [key: string]: { [key: string]: number } }, invoice) => {
      const { reference, eletricPower, eletricSCEEE, publicLightingContributionValue, customerNumber } = invoice;
      const consumption = (eletricPower?.value || 0) + (eletricSCEEE?.value || 0) + (publicLightingContributionValue || 0);
      
      if (!acc[reference]) {
        acc[reference] = {};
      }
  
      acc[reference][customerNumber] = (acc[reference][customerNumber] || 0) + consumption;
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      ...data
    }));
  }, [invoices]);
  const totalValueWithoutGDKeys = useMemo(() => {
    return Object.keys(totalValueWithoutGD[0] || {}).filter(key => key !== 'date');
  }, [totalValueWithoutGD]);

  const economyGD = useMemo(() => {
    const groupedData: { [key: string]: { [key: string]: number } } = invoices.reduce((acc: { [key: string]: { [key: string]: number } }, invoice) => {
      const { reference, eletricCompensated, customerNumber } = invoice;
      const consumption = eletricCompensated?.value || 0;
      
      if (!acc[reference]) {
        acc[reference] = {};
      }
  
      acc[reference][customerNumber] = (acc[reference][customerNumber] || 0) + consumption;
  
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      ...data
    }));
  }, [invoices]);
  const economyGDKeys = useMemo(() => {
    return Object.keys(economyGD[0] || {}).filter(key => key !== 'date');
  }, [economyGD]);

  const dataFormatter = (number: number) =>
    `R$${Intl.NumberFormat('pt-BR').format(number).toString()}`;
  
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

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h1 className="text-xl font-extrabold leading-none tracking-tight text-black dark:text-white">Consumo de Energia Elétrica (kWh)</h1>
              <BarChart
                className="h-80"
                data={eletricalPowerConsumptionkWh}
                index="date"
                categories={eletricalPowerConsumptionKeys}
                colors={getColorsTremor(eletricalPowerConsumptionKeys.length)}
                yAxisWidth={60}
                xAxisLabel="Mês/Ano"
                yAxisLabel="Consumo (kWh)"
              />
            </Card>
            <Card>
              <h1 className="text-xl font-extrabold leading-none tracking-tight text-black dark:text-white">Energia Compensada (kWh)</h1>
              <BarChart
                className="h-80"
                data={compensatedEnergykWh}
                index="date"
                categories={compensatedEnergyKeys}
                colors={getColorsTremor(compensatedEnergyKeys.length)}
                yAxisWidth={60}
                xAxisLabel="Mês/Ano"
                yAxisLabel="Energia compensada (kWh)"
              />
            </Card>
            <Card>
              <h1 className="text-xl font-extrabold leading-none tracking-tight text-black dark:text-white">Valor Total sem GD (R$)</h1>
              <BarChart
                className="h-80"
                data={totalValueWithoutGD}
                index="date"
                categories={totalValueWithoutGDKeys}
                colors={getColorsTremor(totalValueWithoutGDKeys.length)}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                xAxisLabel="Mês/Ano"
                yAxisLabel="Total (R$)"
              />
            </Card>
            <Card>
              <h1 className="text-xl font-extrabold leading-none tracking-tight text-black dark:text-white">Economia GD (R$)</h1>
              <BarChart
                className="h-80"
                data={economyGD}
                index="date"
                categories={economyGDKeys}
                colors={getColorsTremor(economyGDKeys.length)}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
                xAxisLabel="Mês do ano"
                yAxisLabel="Custos (R$)"
              />
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
