import Energy from "domain/vo/Energy";

export default class Invoice {
    private constructor(
        readonly customerNumber: number,
        private monthReference: string,
        private eletricPower: Energy,
        private eletricSCEEE: Energy,
        private eletricGDI: Energy,
        private publicLightingContribution: number
    ) {}

    static create(
        customerNumber: number,
        monthReference: string,
        eletricPower: Energy,
        eletricSCEEE: Energy,
        eletricGDI: Energy,
        publicLightingContribution: number
    ) {
        return new Invoice(
            customerNumber,
            monthReference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            publicLightingContribution
        );
    }

    static restore(
        customerNumber: number,
        monthReference: string,
        eletricPower: Energy,
        eletricSCEEE: Energy,
        eletricGDI: Energy,
        publicLightingContribution: number
    ) {
        return new Invoice(
            customerNumber,
            monthReference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            publicLightingContribution
        );
    }
}