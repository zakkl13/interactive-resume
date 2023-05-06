export interface QuoteOfTheDayResponse {
    quote: Quote
}

export interface Quote {
    contents: string,
    author: string
}