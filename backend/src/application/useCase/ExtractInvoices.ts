import InvoiceRepository from "application/repository/InvoiceRepository";
import Invoice from "domain/entity/Invoice";
import fs from 'fs';
import path from 'path';
import pdfParse from "pdf-parse";

export default class ExtractInvoices {
    constructor(private readonly invoiceRepository: InvoiceRepository) {}

    async execute() {
        const folderPath = path.resolve(__dirname, '..', '..', '..', 'invoices')
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            if (path.extname(file).toLowerCase() !== '.pdf') continue;

            const filePath = path.join(folderPath, file);
            const extractedData = await this.extractDataFromPDF(filePath);
            const invoice = Invoice.create(
                extractedData.customerNumber,
                extractedData.reference,
                extractedData.eletricPower,
                extractedData.eletricSCEEE,
                extractedData.eletricGDI,
                extractedData.publicLightingContribution
            );
            await this.invoiceRepository.save(invoice);
        }
    }

    private async extractDataFromPDF(filePath: string): Promise<any> {
        const pdf = fs.readFileSync(filePath);
        const text = (await pdfParse(pdf)).text;
        const data = {
            customerNumber: this.extractValueFromText(text, "Nº DA INSTALAÇÃO"),
            reference: this.extractValueFromText(text, "Valor a pagar (R$)"),
            eletricPower: {
                quantityKWh: this.extractValueFromText(text, "Energia ElétricakWh"),
                price: this.extractValueFromText(text, "Energia ElétricakWh", 10) // Passando o índice para obter o preço
            },
            eletricSCEEE: {
                quantityKWh: this.extractValueFromText(text, "Energia SCEE s/ ICMSkWh"),
                price: this.extractValueFromText(text, "Energia SCEE s/ ICMSkWh", 9) // Passando o índice para obter o preço
            },
            eletricGDI: {
                quantityKWh: this.extractValueFromText(text, "Energia compensada GD IkWh"),
                price: this.extractValueFromText(text, "Energia compensada GD IkWh", 8) // Passando o índice para obter o preço
            },
            publicLightingContribution: this.extractValueFromText(text, "Contrib Ilum Publica Municipal")
        }
        return data;
    }

    private extractValueFromText(text: string, keyword: string, index = 0): string {
        const splitText = text.split(keyword);
        if (splitText.length > 1) {
            return splitText[1].trim().split(" ")[index];
        } else {
            console.log(`Keyword "${keyword}" not found in text`)
            return "";
        }
    }
}