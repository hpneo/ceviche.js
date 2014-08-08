# Capítulo 5: Pruebas

> Ahora que conocemos un poco más a fondo JavScript y cómo manejar el DOM, así como algunas APIs del navegador, necesitamos estar completamente seguros de que nuestro código funcione, por lo que es importante realizar pruebas en él.

## Pruebas automatizadas

Cada vez que copiamos un código y refrescamos el navegador para saber si funciona o no, estamos probando. Es un proceso rápido, pero en ocasiones puede ser tedioso y aburrido, así que lo ideal sería dejar que la computadora probara por nosotros. Es aquí donde aparecen las pruebas automatizadas.

En términos simples, una prueba automatizada verifica el correcto funcionamiento de un código mediante valores `true` o `false`. Por ejemplo, si deseamos probar una suma, podemos hacer lo siguiente:

```javascript
var resultado = 10 + 15;

console.assert(resultado === 25, 'La suma de 10 y 15 debe ser 25');
```

Usamos `console.assert` para verificar una condición, que debe dar `true`, o, en caso contrario, mostrar un mensaje de error, el cual contiene la descripción de la validación. `console.assert` es un método de la consola disponible en todos los navegadores modernos (desde IE8 en adelante, Firefox, Chrome, Safari y Opera).

Idealmente, nuestro código más importante debe tener pruebas automatizadas que validen que funcione correctamente.

## Pruebas unitarias

Existen diferentes tipos de pruebas, de acuerdo a la forma cómo se desea probar el código:

* Pruebas unitarias: Buscan validar una parte del código a la vez, sin importar para qué se utilice dicho código.
* Pruebas funcionales: Buscan validar toda una acción que un usuario normalmente haría en el sitio o la aplicación web en la que se trabaja.

Las pruebas unitarias son *fáciles* de hacer, si se identifican correctamente las partes de la aplicación que deben probarse. En el [capítulo 2](2-funciones.md) creamos un módulo llamado `titleBuilder`, que permite crear un título para la web de La Buena Espina según la sección que estemos visitando:

```javascript
var titleBuilder = (function() {
  var baseTitle = 'La Buena Espina';
  var parts = [baseTitle];
  
  function getSeparator() {
    if (parts.length == 2) {
      return ' — ';
    }
    else {
      return ' › ';
    }
  };
  
  return {
    reset: function() {
      parts = [baseTitle];
    },
    addPart: function(part) {
      parts.push(part);
    },
    toString: function() {
      return parts.join(getSeparator());
    }
  };
})();
```

Ahora, crearemos algunas validaciones con `console.assert`:

```javascript
console.assert(titleBuilder.toString() === 'La Buena Espina', 'El título por defecto debe ser "La Buena Espina"');
```

De esta forma validamos que el título sea "La Buena Espina" si no hemos navegado por ninguna sección del sitio. ¿Qué pasaría si una validación falla? Tenemos un mensaje de error en la consola de la siguiente forma:

```javascript
console.assert(titleBuilder.toString() === ' - La Buena Espina - ', 'El título por defecto debe ser "La Buena Espina"');
// Assertion failed: El título por defecto debe ser "La Buena Espina" 
```

El primer parámetro es una condición que debe evaluarse como verdadero, mientras que el segundo parámetro es la descripción de la validación.

Podemos seguir haciendo más validaciones, de la siguiente forma:

```javascript
titleBuilder.addPart('Carta');
titleBuilder.addPart('Pescados');
titleBuilder.addPart('Ceviches');

console.assert(titleBuilder.toString() === 'La Buena Espina › Carta › Pescados › Ceviches', 'El título ahora debe ser "La Buena Espina › Carta › Pescados › Ceviches"');

titleBuilder.reset();
titleBuilder.addPart('Locales');

console.assert(titleBuilder.toString() === 'La Buena Espina — Locales', 'El título ahora debe ser "La Buena Espina — Locales"');
```

Si las validaciones con `console.assert` pasan correctamente, la descripción de la validación no se mostrará. Este comportamiento puede no ser tan útil: __¿Cómo sabemos cuántas validaciones han pasado correctamente, y cuántas no?__ Además, __¿de qué nos sirve tener los mensajes de error en la consola?__. Es aquí donde entran en escena diversos frameworks para pruebas, una de las cuales es QUnit.

### QUnit

[QUnit](http://qunitjs.com/) es un framework para pruebas unitarias creado por jQuery, donde, en lugar de utilizar la consola para mostrar los resultados, crea un reporte en HTML con los resultados de las pruebas realizadas. En QUnit, cada comparación que hacemos se llama *assert*, mientras que el conjunto de *asserts* es llamado *test*.

Para poder utilizar QUnit debemos descargar dos archivos desde su web (o utilizar los archivos vía su CDN):

```html
<!DOCTYPE html>
<html>
<head>
  <title>Pruebas unitarias</title>
  <link rel="stylesheet" type="text/css" href="http://code.jquery.com/qunit/qunit-1.14.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script type="text/javascript" src="http://code.jquery.com/qunit/qunit-1.14.0.js"></script>
</body>
</html>
```

Con este código tenemos la base necesaria para poder realizar pruebas unitarias con QUnit. Lo siguiente será pasar las validaciones que hicimos con `console.assert` a una prueba unitaria con QUnit:

```javascript
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
```

En este caso `assert.ok` toma los mismos valores que `console.assert` (una condición que debe evaluarse como verdadera y la descripción de la validación). Las 3 validaciones o *asserts* son agrupadas en una *prueba* o *test*, definida por el método `QUnit.test`.