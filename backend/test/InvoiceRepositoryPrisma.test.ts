import Invoice from "domain/entity/Invoice";
import Energy from "domain/vo/Energy";
import prisma from "infra/database/PrismaConnection";
import InvoiceRepositoryPrisma from "infra/repository/InvoiceRepositoryPrisma";

describe("InvoiceRepositoryPrisma", () => {
    const invoiceRepository = new InvoiceRepositoryPrisma(prisma);
    const customerNumber = BigInt(7202788969)
    const invoice = Invoice.create(
      customerNumber,
      "DEZ/2023",
      new Energy(100, 95.19),
      new Energy(1299, 659.82),
      new Energy(1299, -633.04),
      41.19
    )
  
    beforeAll(async () => {
      await prisma.invoice.deleteMany();
    });
  
    afterAll(async () => {
      await prisma.$disconnect();
    });

    it("should create an invoice", async () => {
      await invoiceRepository.save(invoice);
      
      const invoices = await invoiceRepository.getByCustomerNumber(BigInt(7202788969))

      expect(invoices.length).toBe(1);
    });

    it("should return an empty array if no invoice found", async () => {
      const invoices = await invoiceRepository.getByCustomerNumber(BigInt(7202788968))

      expect(invoices.length).toBe(0);
    })
});