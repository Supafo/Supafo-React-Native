export interface locationDataType {
    key: string,
    value: string,
    disabled?: boolean,
}

export const locationData: locationDataType[] = [
    { key: '1', value: 'İstiklal Park' },
    { key: '2', value: 'Arnavutköy' },
    { key: '3', value: 'Bağcılar' },
    { key: '4', value: 'Bahçelievler', disabled: true },
    { key: '5', value: 'Başakşehir' },
    { key: '6', value: 'Bayrampaşa' },
    { key: '7', value: 'Beyoğlu' },
]