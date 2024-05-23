import { Invoice } from "../types/Invoice";

export interface InvoiceGateway {
    getInvoices(search?: string): Promise<Invoice[]>;
    getInvoice(id: string): Promise<Invoice>;
}