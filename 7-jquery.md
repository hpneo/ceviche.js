# Capítulo 7: jQuery

Si bien ya sabemos cómo manejar el DOM, necesitamos que nuestro sitio web funcione bien en diferentes navegadores por igual. [jQuery](http://jquery.com) está diseñado desde sus inicios para dar soporte al manejo del DOM en todos los navegadores conocidos.

jQuery ofrece una serie de métodos para manipular el DOM, manejar eventos y realizar llamadas asíncronas, de tal forma que todo funcione de la misma manera en todos los navegadores.

Para utilizar jQuery en un sitio web debemos ir a la sección *Download* y elegir una de las versiones que ofrece jQuery. Cabe resaltar que se está dando soporte a dos versiones: la 1.x y la 2.x. La diferencia entre ambas es que la 2.x ya no tiene soporte para Internet Explorer 6, 7 y 8; así que elegir una u otra versión depende del soporte que quieras para tu sitio o aplicación.

En este caso, elegimos la versión 1.11.1 en su versión para desarrollo:

```html
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
</body>
</html>
```

---

Para cargar un archivo JavaScript utilizamos la etiqueta `<script>`, poniendo la dirección del archivo en el atributo `src`. En algunos casos la etiqueta `<script>` estará dentro de la etiqueta `<head>`, pero en otros casos puede estar al final de la etiqueta `<body>`. ¿Por qué pasa esto?

Los navegadores leen un documento HTML y lo muestran de forma visual en un proceso que es llamado __renderizado__. En este proceso, que puede variar un poco entre navegadores, el navegador lee el documento HTML y lo va interpretando progresivamente, lo cual quiere decir que, por cada parte que lee, verifica si existe algún recurso que debe ser cargado (puede ser una imagen, un iframe, una hoja de estilos o un archivo JavaScript).

Este proceso va de inicio a fin, por lo que, si las etiquetas `<script>` se ponen dentro de la etiqueta `<head>`, el navegador va a esperar a que terminen de cargar los archivos JavaScript para seguir leyendo el resto del documento. Esto puede ser contraproducente en la mayoría de casos, por lo que se recomienda poner las etiquetas `<script>` al final de la etiqueta `<body>`, de esta forma todo el documento cargará y se mostrará en la pantalla de una forma más rápida.

---

jQuery tiene una función del mismo nombre, pero se utiliza comúnmente un alias: `$`. Esta función acepta diferentes parámetros:

* Un selector (por ejemplo: `body`, o `#elemento_1`). Puede aceptar como segundo parámetro un nodo elemento de *contexto*, para limitar la búsqueda del selector.
* Una cadena conteniendo HTML (por ejemplo: `<p></p>`), para crear nodos elementos de una manera más rápida. Puede aceptar un segundo parámetro, el cual servirá como nodo documento, que es donde se agregará el o los elementos a crear.
* Un elemento, un arreglo o una lista de nodos elementos (por ejemplo: `document.querySelectorAll('a')`).

Usando la función `$` con cualquiera de los 3 parámetros se devuelve un objeto instancia de jQuery. Esta instancia es parecida a un arreglo, y tiene diferentes métodos para manejar sus elementos.

Adicionalmente, `$` puede aceptar una función, la cual se ejecutará cuando todo el documento ha terminado de cargar.

## Selectores

jQuery permite obtener los elementos del DOM mediante selectores, de la misma forma como lo hace el método `querySelectorAll`, con la diferencia que también acepta selectores propios:

### Atributos

* `[name!="value"]`: Devuelve todos los elementos cuyo atributo de nombre `name` __no__ tiene el valor `value`

### Básico

* `:animated`: Devuelve los elementos que están siendo animados en ese instante.
* `:eq(index)`: Devuelve el elemento que se encuentra en el índice seleccionado, dentro de un conjunto de elementos.
* `:even`: Devuelve los elementos cuyos índices sean pares, teniendo en cuenta que el índice empieza en `0`, por lo que selecciona los elementos en los índices `0`, `2`, `4` y sucesivos.
* `:first`: Devuelve el primer elemento de un conjunto de elementos.
* `:gt(index)`: Devuelve los elementos cuyos índices sean mayores al índice seleccionado.
* `:header`: Devuelve todos los elementos que sean `h1`, `h2`, `h3` y similares.
* `:last`: Devuelve el último elemento de un conjunto de elementos.
* `:lt(index)`: Devuelve los elementos cuyos índices sean menores al índice seleccionado.
* `:odd`: Devuelve los elementos cuyos índices sean impares, teniendo en cuenta que el índice empieza en `0`, por lo que selecciona los elementos en los índices `1`, `3`, `5` y sucesivos.

### Contenido

* `:has(selector)`: Devuelve todos los elementos que contienen los elementos definidos en el segundo selector.
* `:parent`: Devuelve todos los elementos que tienen al menos un nodo hijo (ya sea elemento o no).

### Formularios

* `:button`: Devuelve los elementos que sean botones, ya sean elementos `<button>` o `<input type="button">`
* `:checkbox`: Devuelve todos los elementos que son `<input type="checkbox">`
* `:file`: Devuelve todos los elementos que son `<input type="file">`
* `:image`: Devuelve todos los elementos que son `<input type="image">`
* `:input`: Devuelve todos los elementos que son `<input>`, `<textarea>`, `<select>` y `<button>`
* `:password`: Devuelve todos los elementos que son `<input type="password">`
* `:radio`: Devuelve todos los elementos que son `<input type="radio">`
* `:reset`: Devuelve todos los elementos que son `<input type="reset">`
* `:selected`: Devuelve el elemento `<option>` seleccionado para un elemento `<select>`
* `:submit`: Devuelve todos los elementos que son `<input type="submit">`
* `:text`: Devuelve todos los elementos que son `<input type="text">`

### Visibilidad

* `:hidden`: Devuelve todos los elementos ocultos, los cuales pueden ser: por tener `display: none` en sus estilos, ser elementos `<input type="hidden">`, tener `width` y `height` en 0, o si tiene algún elemento ancestro oculto.
* `:visible`: Devuelve todos los elementos que son visibles. En jQuery, un elemento es considerado visible si ocupa espacio en la pantalla, por lo que elementos con `visibility: hidden` u `opacity: 0` en sus estilos son considerados elementos visibles.

## Eventos

jQuery permite manejar eventos, tanto del navegador como propios, utilizando los métodos `on` y `off` (para agregar y eliminar *listeners*, respectivamente). Estos métodos funcionan de la misma manera para eventos del navegador y propios, e incluso se pueden lanzar (o *disparar*) manualmente utilizando el método `trigger`.

Cabe recordar que jQuery agrega *listeners* a los eventos en la *bubbling phase*, y no en la *capture phase*. Esto es importante de recordar, dada la [diferencia que existe entre agregar un *listener* en cualquiera de las dos fases](3-dom-cssom#event-flow).

## Ajax

Además de manejar operaciones en el DOM, jQuery es capaz de manejar operaciones asíncronas. jQuery utiliza `XMLHttpRequest` o `ActiveXObject`, según sea el caso (por ejemplo, en versiones de Internet Explorer donde existe `ActiveXObject`, se utiliza este).

## Plugins

Una de las ventajas de jQuery es la comunidad que tiene detrás, creada en buena parte por los *plugins* que permite crear. Un *plugin* en jQuery es, básicamente, un método agregado al *prototype* de la función `jQuery` al cual se puede acceder mediante la propiedad `jQuery.fn` (o `$.fn`).