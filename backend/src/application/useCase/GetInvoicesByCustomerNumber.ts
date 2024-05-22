import InvoiceRepository from "application/repository/InvoiceRepository";

export default class GetInvoicesByCustomerNumber {
    constructor(private readonly invoiceRepository: InvoiceRepository) {}

    async execute(customerNumber: bigint) {
        const invoices = await this.invoiceRepository.getByCustomerNumber(customerNumber);

        return invoices;
    }
}