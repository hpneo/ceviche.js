# Apéndice B: Bibliotecas de terceros

Cuando nos metemos al desarrollo de un sitio web, es común encontrarse con necesidades que pueden ser cubiertas fácilmente por código de otras personas, lo cual es perfectamente válido. Estas son algunas bibliotecas útiles en cualquier desarrollo web.

## jQuery

[jQuery](http://jquery.com/) es la biblioteca más popular de JavaScript y resuelve uno de los más grandes problemas en el desarrollo web: El código *cross-browser*. Hace muchos años, se tenía que crear dos versiones del mismo código: una para Netscape y otra para Internet Explorer. Cuando Netscape desapareció y apareció Firefox, se dio el mismo caso, una vez más con Internet Explorer del otro lado. Si a eso le sumamos otros navegadores, como Opera o Safari (para Mac OS), el código crece rápidamente.

jQuery ofrece una serie de métodos para manipular el DOM, manejar eventos y realizar llamadas asíncronas, de tal forma que todo funcione de la misma manera en todos los navegadores.

Para utilizar jQuery en un sitio web debemos ir a la sección *Download* y elegir una de las versiones que ofrece jQuery. Cabe resaltar que se está dando a dos versiones: la 1.x y la 2.x. La diferencia entre ambas es que la 2.x ya no tiene soporte para Internet Explorer 6, 7 y 8; así que elegir una u otra versión depende del soporte que quieras para tu sitio o aplicación.

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

jQuery tiene [documentación con ejemplos](http://api.jquery.com/), dividida en las siguientes secciones:

* __Ajax__: Funciones relacionadas a operaciones asíncronas
* __Attributes__: Métodos que manejan atributos de elementos
* __Callbacks__: Objeto para manejar callbacks (tal y como vimos en [el capítulo 2](/2-funciones#callbacks))
* __Core__: Funciones relacionadas al uso de jQuery
* __CSS__: Métodos que manejan estilos de elementos
* __Data__: Métodos que manejan datos de elementos (utilizando la propiedad `dataset`)
* __Deferred__ Object: Objeto que permite manejar promesas
* __Deprecated__: Funciones y métodos que serán eliminados
* __Dimensions__: Métodos que manejan dimensiones de elementos (alto y ancho)
* __Effects__: Animaciones simples y de bajo nivel
* __Events__: Métodos para manejar eventos del DOM y eventos propios
* __Forms__: Métodos relacionados al manejo de formularios
* __Internals__: Propiedades relacionadas a cada instancia de jQuery
* __Manipulation__: Métodos para manipular elementos (agregar y eliminar elementos)
* __Miscellaneous__: Funciones y métodos accesorios
* __Offset__: Métodos utilizados para obtener la posición de elementos dentro del documento
* __Properties__: Propiedades globales de jQuery
* __Removed__: Funciones y métoods que han sido eliminadas
* __Selectors__: Selectores utilizados para obtener elementos en jQuery. Estos selectores son, en su mayoría, CSS, pero existen selectores propios de jQuery.
* __Traversing__: Métodos utilizados para navegar entre elementos del DOM
* __Utilities__: Funciones utilitarias

## Zepto

[Zepto](http://zeptojs.com/) es una biblioteca similar a jQuery, aunque de menor tamaño. Zepto le da soporte solo a navegadores modernos, como:

* Safari 6+ (Mac)
* Chrome 30+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
* Firefox 24+ (Windows, Mac, Android, Linux, Firefox OS)
* iOS 5+ Safari
* Android 2.3+ Browser
* Internet Explorer 10+ (Windows, Windows Phone)

Mientras que soporta parcialmente:

* iOS 3+ Safari
* Chrome <30
* Firefox 4+
* Safari <6
* Android Browser 2.2
* Opera 10+
* webOS 1.4.5+ Browser
* BlackBerry Tablet OS 1.0.7+ Browser
* Amazon Silk 1.0+
* Otros navegadores basados en WebKit

Esto difiere de jQuery, que soporta a todos los navegadores posibles en su rama 1.x (la versión 2.0 de jQuery en adelante soporta solo navegadores modernos).

Una característica importante de Zepto es que la biblioteca por defecto contiene ciertos módulos: Core, Events, Ajax, Form, IE. Si se desea tener la biblioteca con todos los módulos, se debe [construir la biblioteca desde el código fuente](https://github.com/madrobby/zepto#building).

## Underscore.js

[Underscore](http://underscorejs.org/) es una biblioteca que contiene métodos necesarios para realizar operaciones con arreglos, objetos, colecciones (arreglos u objetos) y funciones. Así mismo, contiene otras funciones utilitarias.

Underscore tiene su [código fuente comentado](http://underscorejs.org/docs/underscore.html), información muy útil para aprender cómo mejorar nuestro propio código.