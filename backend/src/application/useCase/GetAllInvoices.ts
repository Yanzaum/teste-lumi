import InvoiceRepository from "application/repository/InvoiceRepository";

export default class GetAllInvoices {
    constructor(private readonly invoiceRepository: InvoiceRepository) {}

    async execute() {
        const invoices = await this.invoiceRepository.getAll();

        return invoices;
    }
}