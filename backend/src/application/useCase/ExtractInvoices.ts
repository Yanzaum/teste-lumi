import InvoiceRepository from "application/repository/InvoiceRepository";
import Invoice from "domain/entity/Invoice";
import Energy from "domain/vo/Energy";
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
                extractedData.eletricCompensated,
                extractedData.eletricHFP,
                extractedData.publicLightingContribution,
                file
            );
            await this.invoiceRepository.save(invoice);
        }
    }

    private async extractDataFromPDF(filePath: string): Promise<any> {
        const pdf = fs.readFileSync(filePath);
        const text = (await pdfParse(pdf)).text;
        const data: any = {};
        if (text.includes("Nº DA INSTALAÇÃO")) {
            data.customerNumber = BigInt(this.extractValueFromText(text, "Nº DA INSTALAÇÃO"));
        }
        if (text.includes("Valor a pagar (R$)")) {
            data.reference = this.extractValueFromText(text, "Valor a pagar (R$)");
        }
        if (text.includes("Energia ElétricakWh")) {
            data.eletricPower = new Energy(
                parseInt(this.extractValueFromText(text, "Energia ElétricakWh").replace('.', '')),
                parseFloat(this.extractValueFromText(text, "Energia ElétricakWh", 10).replace(',', '.'))
            );
        }
        if (text.includes("Energia SCEE s/ ICMSkWh")) {
            data.eletricSCEEE = new Energy(
                parseInt(this.extractValueFromText(text, "Energia SCEE s/ ICMSkWh").replace('.', '')),
                parseFloat(this.extractValueFromText(text, "Energia SCEE s/ ICMSkWh", 9).replace(',', '.'))
            );
        }
        if (text.includes("Energia compensada GD IkWh")) {
            data.eletricGDI = new Energy(
                parseInt(this.extractValueFromText(text, "Energia compensada GD IkWh").replace('.', '')),
                parseFloat(this.extractValueFromText(text, "Energia compensada GD IkWh", 8).replace(',', '.'))
            );
        }
        if (text.includes("En comp. s/ ICMSkWh")) {
            data.eletricCompensated = new Energy(
                parseInt(this.extractValueFromText(text, "En comp. s/ ICMSkWh").replace('.', '')),
                parseFloat(this.extractValueFromText(text, "En comp. s/ ICMSkWh", 9).replace(',', '.'))
            );
        }
        if (text.includes("Energia injetada HFPkWh")) {
            data.eletricHFP = new Energy(
                parseInt(this.extractValueFromText(text, "Energia injetada HFPkWh").replace('.', '')),
                parseFloat(this.extractValueFromText(text, "Energia injetada HFPkWh", 8).replace(',', '.'))
            );
        }
        if (text.includes("Contrib Ilum Publica Municipal")) {
            data.publicLightingContribution = parseFloat(this.extractValueFromText(text, "Contrib Ilum Publica Municipal").split("\n")[0].replace(',', '.'));
        }
        return data;
    }

    private extractValueFromText(text: string, keyword: string, index = 0): string {
        const splitText = text.split(keyword);
        if (splitText.length > 1) {
            return splitText[1].trim().split(" ")[index];
        } else {
            // console.log(`Keyword "${keyword}" not found in text`)
            return "";
        }
    }
}