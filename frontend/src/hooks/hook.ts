import { Invoice } from "@/service/api/invoices/types/Invoice";
import { useMemo } from "react";

export default function InvoiceHook(invoices: Invoice[]) {
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
            const { reference, eletricPower, eletricSCEEE, publicLightingContribution, customerNumber } = invoice;
            const consumption = (eletricPower?.value || 0) + (eletricSCEEE?.value || 0) + (publicLightingContribution || 0);
          
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

    return {
        eletricalPowerConsumptionkWh,
        eletricalPowerConsumptionKeys,
        compensatedEnergykWh,
        compensatedEnergyKeys,
        totalValueWithoutGD,
        totalValueWithoutGDKeys,
        economyGD,
        economyGDKeys
    };
}