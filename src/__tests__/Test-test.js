describe('Test', function() {
    it('should be test', function() {
        expect(0).toBe(0);
    });

    it('should be able to use ES6 syntax', function() {
        let [a, b] = [0, 1];

        expect({a, b}).toEqual({a: 0, b: 1});
    });
});
