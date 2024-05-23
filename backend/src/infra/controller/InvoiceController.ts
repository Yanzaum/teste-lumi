import HttpServer from "application/http/HttpServer";
import ExtractInvoices from "application/useCase/ExtractInvoices";
import GetAllInvoices from "application/useCase/GetAllInvoices";
import GetInvoicesByCustomerNumber from "application/useCase/GetInvoicesByCustomerNumber";

export default class InvoiceController {
	constructor (
		readonly httpServer: HttpServer,
		readonly getAllInvoices: GetAllInvoices,
        readonly getInvoicesByCustomerNumber: GetInvoicesByCustomerNumber,
        readonly extractInvoices: ExtractInvoices
	) {
		httpServer.register("get", "/api/invoices", async function (params: any, body: any, query: any) {
            const { search } = query;
			const output = await getAllInvoices.execute(search);
			return {
				body: output
			};
		});

        httpServer.register("get", "/api/invoices/:customerNumber", async function (params: any, body: any) {
            const output = await getInvoicesByCustomerNumber.execute(params.customerNumber);
            return {
                body: output
            };
        });

        httpServer.register("post", "/api/invoices/extract", async function (params: any, body: any) {
            const output = await extractInvoices.execute();
            return {
                body: output
            };
        });
	}
}