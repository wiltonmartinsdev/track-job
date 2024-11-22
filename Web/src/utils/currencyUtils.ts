const currencySymbols: { [key: string]: string } = {
    Real: "R$",
    Dólar: "$",
    Euro: "€",
};

export function getCurrencySymbol(currency: string): string {
    return currencySymbols[currency] || "";
}