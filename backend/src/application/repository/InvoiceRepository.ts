import Invoice from "domain/entity/Invoice";

export default interface InvoiceRepository {
    save(invoice: Invoice): Promise<void>;
    getAll(): Promise<Invoice[]>;
    getByCustomerNumber(customerNumber: bigint): Promise<Invoice[]>;
}