import { invoiceService } from "@/service/api/invoices";
import { Invoice } from "@/service/api/invoices/types/Invoice";
import { RiDownloadLine } from "@remixicon/react";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { useMutation } from "react-query";

export default function InvoicesTable({ invoices }: {
    invoices: Invoice[]
}) {
    const {
        mutate: downloadInvoice
    } = useMutation({
        mutationFn: ({
            id,
        }: {
            id: string,
            filename: string
        }) => invoiceService.downloadInvoice(id),
        onSuccess: (blob, { filename }) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    })

    const formatValue = (value?: number) => {
        if (!value) return null;
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const formatkWh = (kWh?: number) => {
        if (!kWh) return null;
        return `${kWh} kWh`;
    }

    return (
        <Card>
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                Faturas
            </h3>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Número do Cliente</TableHeaderCell>
                        <TableHeaderCell>Referência</TableHeaderCell>
                        <TableHeaderCell>Energia Elétrica</TableHeaderCell>
                        <TableHeaderCell>Energia SCEE</TableHeaderCell>
                        <TableHeaderCell>Energia GDI</TableHeaderCell>
                        <TableHeaderCell>Energia Compensada</TableHeaderCell>
                        <TableHeaderCell>Energia HFP</TableHeaderCell>
                        <TableHeaderCell>Contribuição Iluminação Pública</TableHeaderCell>
                        <TableHeaderCell>Arquivo</TableHeaderCell>
                        <TableHeaderCell>Ações</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.customerNumber}</TableCell>
                            <TableCell>{invoice.reference}</TableCell>
                            <TableCell>
                                {invoice.eletricPower?.kWh ? (
                                    <>
                                        {formatkWh(invoice.eletricPower?.kWh)} | {formatValue(invoice.eletricPower?.value)}
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell>
                                {invoice.eletricSCEEE?.kWh ? (
                                    <>
                                        {formatkWh(invoice.eletricSCEEE?.kWh)} | {formatValue(invoice.eletricSCEEE?.value)}
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell>
                                {invoice.eletricGDI?.kWh ? (
                                    <>
                                        {formatkWh(invoice.eletricGDI?.kWh)} | {formatValue(invoice.eletricGDI?.value)}
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell>
                                {invoice.eletricCompensated?.kWh ? (
                                    <>
                                        {formatkWh(invoice.eletricCompensated?.kWh)} | {formatValue(invoice.eletricCompensated?.value)}
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell>
                                {invoice.eletricHFP?.kWh ? (
                                    <>
                                        {formatkWh(invoice.eletricHFP?.kWh)} | {formatValue(invoice.eletricHFP?.value)}
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell>{formatValue(invoice.publicLightingContribution)}</TableCell>
                            <TableCell>{invoice.filename}</TableCell>
                            <TableCell>
                                <Button icon={RiDownloadLine} onClick={() => downloadInvoice({
                                    id: invoice.id,
                                    filename: invoice.filename
                                })}>
                                    Baixar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}