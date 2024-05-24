export type Invoice = {
    id: string
    customerNumber: string
    reference: string
    eletricPower?: {
        kWh?: number
        value?: number
    }
    eletricSCEEE?: {
        kWh?: number
        value?: number
    }
    eletricGDI?: {
        kWh?: number
        value?: number
    }
    eletricCompensated?: {
        kWh?: number
        value?: number
    }
    eletricHFP?: {
        kWh?: number
        value?: number
    }
    publicLightingContribution: number
    filename: string
}