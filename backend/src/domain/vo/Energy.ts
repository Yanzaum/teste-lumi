export default class Energy {
    constructor(
        private quantityKWh: number,
        private price: number,
    ) {}

    getQuantityKWh() {
        return this.quantityKWh;
    }

    getPrice() {
        return this.price;
    }
}