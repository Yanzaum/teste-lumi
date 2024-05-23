export default class Energy {
    private quantityKWh: number;
    private price: number;

    constructor(quantityKWh: number = 0, price: number = 0) {
        this.quantityKWh = quantityKWh;
        this.price = price;
    }

    getQuantityKWh(): number {
        return this.quantityKWh;
    }

    getValue(): number {
        return this.price;
    }
}