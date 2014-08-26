describe('Módulo titleBuilder', function() {
  beforeEach(function() {
    titleBuilder.reset();
  });

  it('debe devolver "La Buena Espina", por defecto', function() {
    expect(titleBuilder.toString()).toEqual('La Buena Espina');
  });

  describe('Al agregar más de una sección', function() {
    it('debe devolver "La Buena Espina › Carta › Pescados › Ceviches"', function() {
      titleBuilder.addPart('Carta');
      titleBuilder.addPart('Pescados');
      titleBuilder.addPart('Ceviches');
      
      expect(titleBuilder.toString()).toEqual('La Buena Espina › Carta › Pescados › Ceviches');
    });
  });

  describe('Al agregar una sola sección', function() {
    it('debe devolver "La Buena Espina — Locales"', function() {
      titleBuilder.addPart('Locales');

      expect(titleBuilder.toString()).toEqual('La Buena Espina — Locales');
    });
  });
});