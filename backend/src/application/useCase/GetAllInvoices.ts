import InvoiceRepository from "application/repository/InvoiceRepository";

export default class GetAllInvoices {
    constructor(private readonly invoiceRepository: InvoiceRepository) {}

    async execute() {
        const invoices = await this.invoiceRepository.getAll();
        return invoices.map(invoice => ({
            id: invoice.getId(),
            customerNumber: invoice.getCustomerNumber().toString(),
            reference: invoice.getReference(),
            eletricPower: {
                kWh: invoice.getEletricPower()?.getQuantityKWh(),
                value: invoice.getEletricPower()?.getValue()
            },
            eletricSCEEE: {
                kWh: invoice.getEletricSCEEE()?.getQuantityKWh(),
                value: invoice.getEletricSCEEE()?.getValue()
            },
            eletricGDI: {
                kWh: invoice.getEletricGDI()?.getQuantityKWh(),
                value: invoice.getEletricGDI()?.getValue()
            },
            eletricCompensated: {
                kWh: invoice.getEletricCompensated()?.getQuantityKWh(),
                value: invoice.getEletricCompensated()?.getValue()
            },
            eletricHFP: {
                kWh: invoice.getEletricHFP()?.getQuantityKWh(),
                value: invoice.getEletricHFP()?.getValue()
            },
            publicLightingContribution: invoice.getPublicLightingContribution()
        }));
    }
}