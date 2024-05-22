import { ExpressAdapter } from "./HttpServer";
import dotenv from 'dotenv';
import InvoiceRepositoryPrisma from "../repository/InvoiceRepositoryPrisma";
import GetAllInvoices from "application/useCase/GetAllInvoices";
import prisma from "../database/PrismaConnection";
import GetInvoicesByCustomerNumber from "application/useCase/GetInvoicesByCustomerNumber";
import InvoiceController from "../controller/InvoiceController";
import ExtractInvoices from "application/useCase/ExtractInvoices";

dotenv.config();

const httpServer = new ExpressAdapter();
const invoiceRepository = new InvoiceRepositoryPrisma(prisma);

const getAllInvoices = new GetAllInvoices(invoiceRepository);
const getInvoicesByCustomerNumber = new GetInvoicesByCustomerNumber(invoiceRepository);
const extractInvoices = new ExtractInvoices(invoiceRepository);

new InvoiceController(
    httpServer,
    getAllInvoices,
    getInvoicesByCustomerNumber,
    extractInvoices
);

httpServer.listen(Number(process.env.PORT) || 4000);