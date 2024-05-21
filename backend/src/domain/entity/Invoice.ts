import Energy from "domain/vo/Energy";
import crypto from "node:crypto";

export default class Invoice {
    private constructor(
        private id: string,
        private customerNumber: bigint,
        private reference: string,
        private eletricPower: Energy,
        private eletricSCEEE: Energy,
        private eletricGDI: Energy,
        private publicLightingContribution: number
    ) {}

    static create(
        customerNumber: bigint,
        reference: string,
        eletricPower: Energy,
        eletricSCEEE: Energy,
        eletricGDI: Energy,
        publicLightingContribution: number
    ) {
        return new Invoice(
            crypto.randomUUID(),
            customerNumber,
            reference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            publicLightingContribution
        );
    }

    static restore(
        id: string,
        customerNumber: bigint,
        reference: string,
        eletricPower: Energy,
        eletricSCEEE: Energy,
        eletricGDI: Energy,
        publicLightingContribution: number
    ) {
        return new Invoice(
            id,
            customerNumber,
            reference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            publicLightingContribution
        );
    }

    getId() {
        return this.id;
    }

    getCustomerNumber() {
        return this.customerNumber;
    }

    getReference() {
        return this.reference;
    }

    getEletricPower() {
        return this.eletricPower;
    }

    getEletricSCEEE() {
        return this.eletricSCEEE;
    }

    getEletricGDI() {
        return this.eletricGDI;
    }

    getPublicLightingContribution() {
        return this.publicLightingContribution;
    }
}