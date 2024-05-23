import Energy from "domain/vo/Energy";
import crypto from 'crypto';

export default class Invoice {
    private constructor(
        private id: string,
        private customerNumber: bigint,
        private reference: string,
        private eletricPower: Energy | null,
        private eletricSCEEE: Energy | null,
        private eletricGDI: Energy | null,
        private eletricCompensated: Energy | null,
        private eletricHFP: Energy | null,
        private publicLightingContribution: number
    ) {}

    static create(
        customerNumber: bigint,
        reference: string,
        eletricPower: Energy | null,
        eletricSCEEE: Energy | null,
        eletricGDI: Energy | null,
        eletricCompensated: Energy | null,
        eletricHFP: Energy | null,
        publicLightingContribution: number
    ) {
        return new Invoice(
            crypto.randomUUID(),
            customerNumber,
            reference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            eletricCompensated,
            eletricHFP,
            publicLightingContribution
        );
    }

    static restore(
        id: string,
        customerNumber: bigint,
        reference: string,
        eletricPower: Energy | null,
        eletricSCEEE: Energy | null,
        eletricGDI: Energy | null,
        eletricCompensated: Energy | null,
        eletricHFP: Energy | null,
        publicLightingContribution: number
    ) {
        return new Invoice(
            id,
            customerNumber,
            reference,
            eletricPower,
            eletricSCEEE,
            eletricGDI,
            eletricCompensated,
            eletricHFP,
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

    getEletricCompensated() {
        return this.eletricCompensated;
    }

    getEletricHFP() {
        return this.eletricHFP;
    }
}