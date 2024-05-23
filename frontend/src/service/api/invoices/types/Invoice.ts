export type Invoice = {
    id: string
    customerNumber: bigint
    reference: string
    eletricPowerkWh?: number
    eletricPowerValue?: number
    eletricSCEEEkWh?: number
    eletricSCEEEValue?: number
    eletricGDIkWh?: number
    eletricGDIValue?: number
    eletricCompensatedkWh?: number
    eletricCompensatedValue?: number
    eletricHFPkWh?: number
    eletricHFPValue?: number
    publicLightingContributionValue?: number
    createdAt: Date
    updatedAt: Date
}