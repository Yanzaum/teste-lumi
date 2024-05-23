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
                quantityKWh: invoice.getEletricPower()?.getQuantityKWh(),
                value: invoice.getEletricPower()?.getPrice()
            },
            eletricSCEEE: {
                quantityKWh: invoice.getEletricSCEEE()?.getQuantityKWh(),
                value: invoice.getEletricSCEEE()?.getPrice()
            },
            eletricGDI: {
                quantityKWh: invoice.getEletricGDI()?.getQuantityKWh(),
                value: invoice.getEletricGDI()?.getPrice()
            },
            eletricCompensated: {
                quantityKWh: invoice.getEletricCompensated()?.getQuantityKWh(),
                value: invoice.getEletricCompensated()?.getPrice()
            },
            eletricHFP: {
                quantityKWh: invoice.getEletricHFP()?.getQuantityKWh(),
                value: invoice.getEletricHFP()?.getPrice()
            },
            publicLightingContribution: invoice.getPublicLightingContribution()
        }));
    }
}