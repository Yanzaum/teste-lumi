import { api } from "../apiService";
import { InvoiceGateway } from "./interface/InvoiceGateway";
import { Invoice } from "./types/Invoice";

export class APIInvoiceService implements InvoiceGateway {
    async getInvoices(search?: string): Promise<Invoice[]> {
        const response = await api.get("/invoices", {
            params: {
                search,
            },
        });
        return response.data;
    }

    async getInvoice(id: string): Promise<Invoice> {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    }
}