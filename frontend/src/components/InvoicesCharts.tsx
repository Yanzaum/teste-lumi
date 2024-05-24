import InvoiceHook from "@/hooks/hook";
import { Invoice } from "@/service/api/invoices/types/Invoice";
import { getColorsTremor } from "@/utils/getColorsTremor";
import { BarChart, Card } from "@tremor/react";

export default function InvoicesCharts({ invoices }: { invoices: Invoice[] }) {
    const {
        eletricalPowerConsumptionkWh,
        eletricalPowerConsumptionKeys,
        compensatedEnergykWh,
        compensatedEnergyKeys,
        totalValueWithoutGD,
        totalValueWithoutGDKeys,
        economyGD,
        economyGDKeys,
      } = InvoiceHook(invoices)
    
    const dataFormatter = (number: number) =>
        `R$${Intl.NumberFormat('pt-BR').format(number).toString()}`;

    return (
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
                    xAxisLabel="Mês do ano"
                    yAxisLabel="Custos (R$)"
                />
            </Card>
        </div>
    )
}