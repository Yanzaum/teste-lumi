import Invoice from "domain/entity/Invoice";

export default interface InvoiceRepository {
    save(invoice: Invoice): Promise<void>;
    get(customerNumber: bigint): Promise<Invoice[]>;
}