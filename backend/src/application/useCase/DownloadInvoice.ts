import InvoiceRepository from "application/repository/InvoiceRepository";

export default class DownloadInvoice {
    constructor(private readonly invoiceRepository: InvoiceRepository) {}

    async execute(id: string) {
        const invoice = await this.invoiceRepository.getById(id)
        return invoice.getFilename()
    }
}