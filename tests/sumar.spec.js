function sumar(a, b) {
    return a + b
}

describe('Test para la funcion sumar', () => {
    it('La funcion sumar retorna la suma de dos numeros', () => {
        expect(sumar(4, 5)).toBe(9);
        expect(sumar(2, 6)).toBe(8)
    })
})