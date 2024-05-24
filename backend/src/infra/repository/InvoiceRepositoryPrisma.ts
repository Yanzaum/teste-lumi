import { PrismaClient } from "@prisma/client";
import InvoiceRepository from "application/repository/InvoiceRepository";
import Invoice from "domain/entity/Invoice";
import Energy from "domain/vo/Energy";

export default class InvoiceRepositoryPrisma implements InvoiceRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(invoice: Invoice): Promise<void> {
        await this.prisma.invoice.create({
            data: {
                id: invoice.getId(),
                customerNumber: invoice.getCustomerNumber(),
                reference: invoice.getReference(),
                eletricPowerkWh: invoice.getEletricPower()?.getQuantityKWh(),
                eletricPowerValue: invoice.getEletricPower()?.getValue(),
                eletricSCEEEkWh: invoice.getEletricSCEEE()?.getQuantityKWh(),
                eletricSCEEEValue: invoice.getEletricSCEEE()?.getValue(),
                eletricGDIkWh: invoice.getEletricGDI()?.getQuantityKWh(),
                eletricGDIValue: invoice.getEletricGDI()?.getValue(),
                eletricCompensatedkWh: invoice.getEletricCompensated()?.getQuantityKWh(),
                eletricCompensatedValue: invoice.getEletricCompensated()?.getValue(),
                eletricHFPkWh: invoice.getEletricHFP()?.getQuantityKWh(),
                eletricHFPValue: invoice.getEletricHFP()?.getValue(),
                publicLightingContribution: invoice.getPublicLightingContribution(),
                filename: invoice.getFilename()
            }
        })
    }

    async getAll(): Promise<Invoice[]> {
        const invoices = await this.prisma.invoice.findMany();
        return invoices.map(invoice => Invoice.restore(
            invoice.id,
            invoice.customerNumber,
            invoice.reference,
            new Energy(invoice.eletricPowerkWh || undefined, invoice.eletricPowerValue || undefined),
            new Energy(invoice.eletricSCEEEkWh || undefined, invoice.eletricSCEEEValue || undefined),
            new Energy(invoice.eletricGDIkWh || undefined, invoice.eletricGDIValue || undefined),
            new Energy(invoice.eletricCompensatedkWh || undefined, invoice.eletricCompensatedValue || undefined),
            new Energy(invoice.eletricHFPkWh || undefined, invoice.eletricHFPValue || undefined),
            invoice.publicLightingContribution,
            invoice.filename
        ))
    }

    async getById(id: string): Promise<Invoice> {
        const invoice = await this.prisma.invoice.findUnique({
            where: {
                id: id
            }
        })
        if (!invoice) throw new Error("Invoice not found")
        return Invoice.restore(
            invoice.id,
            invoice.customerNumber,
            invoice.reference,
            new Energy(invoice.eletricPowerkWh || undefined, invoice.eletricPowerValue || undefined),
            new Energy(invoice.eletricSCEEEkWh || undefined, invoice.eletricSCEEEValue || undefined),
            new Energy(invoice.eletricGDIkWh || undefined, invoice.eletricGDIValue || undefined),
            new Energy(invoice.eletricCompensatedkWh || undefined, invoice.eletricCompensatedValue || undefined),
            new Energy(invoice.eletricHFPkWh || undefined, invoice.eletricHFPValue || undefined),
            invoice.publicLightingContribution,
            invoice.filename
        )
    }

    async getByCustomerNumber(customerNumber: bigint): Promise<Invoice[]> {
        const invoices = await this.prisma.invoice.findMany({
            where: {
                customerNumber: customerNumber
            }
        })
        return invoices.map(invoice => Invoice.restore(
            invoice.id,
            invoice.customerNumber,
            invoice.reference,
            new Energy(invoice.eletricPowerkWh || undefined, invoice.eletricPowerValue || undefined),
            new Energy(invoice.eletricSCEEEkWh || undefined, invoice.eletricSCEEEValue || undefined),
            new Energy(invoice.eletricGDIkWh || undefined, invoice.eletricGDIValue || undefined),
            new Energy(invoice.eletricCompensatedkWh || undefined, invoice.eletricCompensatedValue || undefined),
            new Energy(invoice.eletricHFPkWh || undefined, invoice.eletricHFPValue || undefined),
            invoice.publicLightingContribution,
            invoice.filename
        ))
    }
}