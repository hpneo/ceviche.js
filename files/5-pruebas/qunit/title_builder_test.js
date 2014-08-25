QUnit.test('módulo titleBuilder', function(assert) {
  assert.ok(titleBuilder.toString() === 'La Buena Espina', 'El título por defecto debe ser "La Buena Espina"');

  titleBuilder.addPart('Carta');
  titleBuilder.addPart('Pescados');
  titleBuilder.addPart('Ceviches');

  assert.ok(titleBuilder.toString() === 'La Buena Espina › Carta › Pescados › Ceviches', 'El título ahora debe ser "La Buena Espina › Carta › Pescados › Ceviches"');

  titleBuilder.reset();
  titleBuilder.addPart('Locales');

  assert.ok(titleBuilder.toString() === 'La Buena Espina — Locales', 'El título ahora debe ser "La Buena Espina — Locales"');
});