# Capítulo 4: APIs del navegador

> Ya conocemos el DOM, con el que podemos modificar elementos y manejar eventos. De paso, vimos algo del CSSOM, y logramos saber cuándo se ejecutan algunas animaciones. Pero el navegador no se limita a ello y ofrece más APIs para crear aplicaciones interactivas y complejas.

## Aplicaciones web y HTML5

Una aplicación web es una herramienta similar a una aplicación de escritorio, pero que es utilizada dentro del navegador, y tiene dos ventajas importantes:

* Es ubicuo: Una aplicación web está disponible en casi cualquier equipo que tenga un navegador web incorporado. Debido a que no existe necesidad de instalar una aplicación, la información del usuario está disponible sin importar el equipo desde donde se acceda a la aplicación.
* Es auto-actualizable: Una aplicación web no reside en el equipo, si no en un servidor web. Esto tiene como ventaja que puede ser actualizada sin necesidad de la interacción del usuario.

Mientras que, como desventajas:

* Su disponibilidad depende de otros factores: De una conexión a Internet, del servidor de la aplicación (tanto para aplicaciones de Internet como intranets), y en situaciones menos comunes, del navegador usado.
* Está limitado al navegador: El navegador por definición está limitado en cuanto a lo que puede acceder del equipo, lo que en términos técnicos se conoce como *sandboxing*. Este tipo de limitaciones, por consiguiente, limitan a las aplicaciones web que se ejecutan dentro de él.

Las aplicaciones web no son de ahora y no implican utilizar solo JavaScript. Existían aplicaciones web antes del llamado *Web 2.0*, que utilizan JavaScript, Java, Flash, Flex, Silverlight, e incluso algunas solo utilizan HTML y CSS. Sin embargo, el avance que ha tenido JavaScript, desde la *Web 2.0* hasta el HTML5, ha logrado superar en alguna forma las desventajas que tenían las aplicaciones web.

Ahora se pueden realizar peticiones al servidor sin recargar toda la página, tener una comunicación interactiva con el servidor, realizar algunas operaciones sin necesidad de tener una conexión, leer y escribir archivos en el equipo, entre otros.

Algunas de las siguientes APIs del navegador servirán para **La Buena Espina**, pero utilizarlas no implica que estemos creando una aplicación web, puesto que ese término está dirigido a la función del producto que se haga y no a las tecnologías que utilice.

## Storage

Empecemos con una API simple de usar pero que soluciona un problema común al trabajar con una aplicación web: El dueño de **La Buena Espina** quiere un formulario de contacto para que los comensales puedan dar sus impresiones sobre el servicio y la comida. Pero, ¿qué pasaría si luego de enviar el formulario se pierde la conexión, el usuario cierra su navegador o el servidor no responde? Los comentarios no llegarán al dueño y se pueden perder buenas críticas con respecto al restaurante.

Las APIs de Storage solucionan este problema, al menos en parte, ya que permiten guardar información en el navegador. Esta información es guardada en formato *nombre - valor*, similar a un solo objeto plano en JavaScript, y puede existir en dos formas:

* *Local Storage*: Existiendo uno por cada *origen* (el valor devuelto por `location.origin`). Estará disponible luego de haber cerrado el navegador.
* *Session Storage*: Similar al *Local Storage*, solo está disponible mientras el navegador esté abierto.

Estos valores sobreviven a pestañas cerradas y recargadas, similar a las *cookies*, excepto que estas tienen un tamaño máximo, [y otras limitaciones](http://diveintohtml5.info/storage.html#divingin). Sin embargo, tanto el *Local Storage* como el *Session Storage* tienen un tamaño máximo de 5 megabytes por *origen*.

Un punto importante a resaltar es que ambos *Storages* se comportan como objetos planos globales, y guardan tanto los nombres como los valores en forma de cadenas. Adicionalmente, tienen dos métodos para acceder y asignar valores: `getItem` y `setItem`.

Para el caso descrito en el primer párrafo, podríamos utilizar el *Local Storage* junto a `dom.js`:

```javascript
dom('#contact-form').on('submit', function() {
  window.localStorage.setItem('contact_content', dom('#contact-comment').value());
});
```

De esta forma, cuando enviemos el formulario, se guardará el contenido del elemento `#contact-comment` en el *Local Storage* bajo el nombre `contact_content`.

## Geolocation

El dueño de **La Buena Espina** quiere que el sitio web de su restaurante invite al usuario a ir a sus locales, y una forma de lograr eso es indicarle a sus posibles clientes la ubicación exacta de sus locales. Pero con eso no basta, porque también podría indicarle al potencial cliente **cómo llegar** a alguno de sus locales, dependiendo de un dato que ahora es más fácil de conseguir: la *geolocalización*.

La *Geolocation API* utiliza diferentes formas para conocer la ubicación de un usuario (o, mejor dicho, del equipo que está utilizando un usuario), diiriendo cada forma en la precisión de la ubicación; y, cuando esta API logra encontrar la ubicación del equipo, devuelve un objeto con 2 valores básicos: la latitud y la longitud. Estos valores numéricos permiten ubicar un lugar en la Tierra a partir de un sistema de coordenadas único para todo el mundo, así que podemos tener la certeza que el valor que devuelva esta API será (relativamente) exacto.

Para trabajar con la *Geolocation API* tenemos que acceder a un objeto dentro de `navigator` llamado `geolocation`, el cual contiene 3 métodos:

* `getCurrentPosition`: Trata de obtener la ubicación del equipo y toma 3 parámetros: Un *callback* que se ejecutará si se logra obtener la ubicación del equipo, un segundo *callback* que se ejecutará si no se logra obtener la ubicación (indicando el motivo del error), y un tercer objeto con configuración de la petición.
* `watchPosition`: Toma los mismos parámetros de `getCurrentPosition` y realiza un monitoreo de la ubicación del equipo, ejecutándose cada vez que el navegador detecte que la ubicación del equipo ha cambiado. Este método devuelve un id, el cual es utilizado por `clearWatch`.
* `clearWatch`: Detiene el monitoreo creado por el método `watchPosition`.

El último parámetro de `getCurrentPosition` y `watchPosition` puede tener los siguientes valores:

* `enableHighAccuracy`: Define un valor booleano que indica si la API tratará de obtener el valor más exacto para la ubicación.
* `timeout`: Indica el tiempo máximo (en milisegundos) que la API esperará por obtener un resultado, o, en caso contrario, lanzar el *callback* de error (segundo parámetro).
* `maximumAge`: Indica el tiempo máximo (en milisegundos) que el navegador guardará en memoria el valor devuelto por la API.

Sabiendo esto, podemos empezar a trabajar con la *Geolocation API*:

```javascript
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords);
}, function(error) {
  console.log(error.message, error.code);
}, {
  enableHighAccuracy: true,
  timeout: 2500,
  maximumAge: 0
});
```

Cuando se ejecute este código se mostrará una ventana o un mensaje (dependiendo del navegador) pidiendo permiso al usuario para poder realizar la geolocalización. Es importante resaltar este punto ya que no es posible obtener la ubicación de un equipo sin previo permiso del usuario.

![Permisos para geolocalización](/images/4-apis-navegador/geolocation.png "Permisos para geolocalización")

*Permisos para geolocalización*

Si denegamos el permiso de geolocalización al navegador, la consola nos mostrará este mensaje:

```javascript
"User denied Geolocation"  1
```

Mientras que el primer valor devuelve un mensaje entendible para el usuario, el segundo valor es un código de error devuelto por la API, el cual puede tener 3 valores:

| Valor | Descripción |
|-------|-------------|
| 1 | El usuario no dio permiso al navegador |
| 2 | No se pudo encontrar la ubicación |
| 3 | Pasó más del tiempo permitido en el *timeout* definido por el tercer parámetro |

Y si le damos el permiso, nos devolverá el siguiente objeto (cuyos valores pueden cambiar de acuerdo al equipo y al tipo de conexión):

```javascript
{
  accuracy: 75,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: -12.1042457,
  longitude: -76.9628362,
  speed: null
}
```

Cuando ya tenemos estos valores podemos utilizar algún servicio de mapas, como [Google Maps](https://developers.google.com/maps/documentation/javascript/), [Mapbox](https://www.mapbox.com/mapbox.js/) o [Leaflet](http://leafletjs.com/reference.html) para mostrar la ubicación de forma visual en un mapa.

## Application Cache

Para el caso de aplicaciones web suele ser de vital importancia el poder acceder a ellas de manera *offline*, sobre todo si la conexión a Internet solo se hace necesaria para respaldar información en un servidor externo. En este tipo de aplicaciones donde se debería poder acceder a los archivos "estáticos" de la aplicación independientemente del estado de conexión que tenga el equipo, y es aquí donde el *Application Cache* entra en acción.

Esta API permite definir un archivo *manifiesto* que indicará cuáles son los archivos que se desean descargar cuando el navegador se conecta a la aplicación cuando está *online*, y que luego utilizará cuando no exista una conexión a Internet disponible.

Un manifiesto básico sigue el siguiente formato:

```
CACHE MANIFEST

/
/images/logo.png
/images/sprites.png
/styles/layout.css
/javascript/libraries/dom.js
/javascript/app.js
```

En este caso, el manifiesto le indica al navegador que debe descargar y guardar en caché todos los archivos ubicados en esas rutas. Sin embargo, las capacidades de este manifiesto no se reducen a indicar la lista de archivos a guardar en caché, si no que permite indicar cuáles deben ser obtenidos siempre desde el servidor, así como indicar archivos que se utilizarán cuando la conexión falle.

```
CACHE MANIFEST

CACHE:
/
images/logo.png
images/sprites.png
styles/layout.css
scripts/libraries/dom.js
scripts/app.js

NETWORK:
*

FALLBACK:
/ /offline.html
```

Este nuevo manifiesto indica explícitamente cuáles son los archivos que deben ser guardados en caché (similar al primer manifiesto), así como los archivos que deben obtenerse del servidor (por defecto, todos los que no están definidos debajo de la línea `CACHE`), y define el archivo que el navegador debe usar en caso algún archivo no pueda ser obtenido.

Para que el navegador sepa dónde encontrar este archivo, debe ser incluido como atributo dentro de la etiqueta `<html>`:

```html
<html manifest="manifest.appcache">
  ...
</html>
```

## File

Con esta API podemos leer archivos que cargamos desde local, mediante la etiqueta `<input type="file" />`, así como al realizar operaciones *drag and drop* de manera nativa. De esta forma, podemos previsualizar imágenes antes de subirlas a un servidor o realizar operaciones con los archivos aunque la aplicación esté *offline*.

Cuando trabajamos con elementos `<input>` podemos acceder a los archivos que han sido elegidos mediante la propiedad `files`, la cual es una lista instancia de `FileList`. Cada elemento de esta lista es un objeto instancia de `File` y tiene algunas propiedades:

| Propiedad | Descripción |
|-----------|-------------|
| `name` | Nombre del archivo |
| `size` | Tamaño en bytes del archivo |
| `type` | *MIME type* del archivo |
| `lastModifiedDate` | Última fecha de modificación del archivo |

Sabiendo las propiedades que tienen estos objetos de *File API*, podemos crear un demo simple, empezando con el código HTML básico:

```html
<input type="file" name="files" id="files" multiple />

<h4>Imágenes elegidas:</h4>
<div id="preview"></div>
```

Y luego utilizamos la API propiamente dicha:

```javascript
var input = document.getElementById('files'),
    preview = document.getElementById('preview');

input.addEventListener('change', function(e) {
  var files = e.target.files;

  for (var i = 0; i < files.length; i++) {
    (function(file) {
      var reader = new FileReader(),
          img = document.createElement('img');

      img.width = 300;
      preview.appendChild(img);

      reader.addEventListener('load', function(e) {
        img.src = e.target.result;
      });

      reader.readAsDataURL(file);
    })(files[i]);
  }
});
```

Dentro de este código de ejemplo utilizamos la función constructora `FileReader`, la cual permite leer los objetos de tipo `File` y convertirlo a una cadena de tipo [__Data URI__](https://developer.mozilla.org/en/docs/data_URIs), para, de esta forma, poder cargarlo en un elemento `<img>`.

En el bucle que lee cada imagen obtenida por el input `files` utilizamos una [función inmediatamente invocada](/2-funciones#funciones-inmediatamente-invocadas) debido a la naturaleza asíncrona de `FileReader`. Con este tipo de funciones, se obliga al navegador a ejecutar todo el código dentro de la función antes de pasar a la siguiente iteración, lo que nos asegura que se lean los valores correctos para cada iteración.

## File System

Esta API simula un sistema de archivos en local, permitiendo crear, modificar y leer archivos mediante JavaScript. Este sistema de archivos simulado no es el sistema de archivos del sistema operativo, si no que está separado en un entorno controlado (a este tipo de entornos se le llama *sandbox*). Actualmente esta API está en fase experimental y está disponible en Chrome y Opera, por lo que tiene un uso potencial en aplicaciones para Chrome OS o aplicaciones web que funcionan con Chromium.

Al ser un entorno controlado, *File System API* tiene ciertas restricciones:

* **Cada origen tiene su sistema de archivos**: Un origen está formado por el protocol, dominio y puerto de un documento. Similar a las APIs de Storage, cada origen tiene su propio sistema de archivos y no se pueden acceder entre sí.
* **No se pueden crear o renombrar archivos ejecutables**: Por seguridad, no se pueden crear archivos ejecutable, ya que estos pueden ser aplicaciones maliciosas (virus, troyanos, etc).
* **No se puede salir del *sandbox***: Igualmente, por seguridad, una aplicación no puede usar la API para acceder a archivos que estén en el sistema de archivos del sistema operativo.
* **No se puede ejecutar desde el protocolo `file://`**: También por seguridad, si se tratar de utilizar esta API en un archivo desde `file://`, el navegador lanzará una excepción y fallará.

Adicionalmente, esta API tiene soporte para trabajar de forma síncrona y asíncrona, recomendando utilizar WebWorkers para el primer caso:

| Interfaz | Descripción | Interfaz Síncrona |
|----------|-------------|-------------------|
| `LocalFileSystem ` | Permite acceder al sistema de archivos controlado | `LocalFileSystemSync` |
| `FileSystem` | Representa un sistema de archivos | `FileSystemSync` |
| `Entry` | Representa una entrada en el sistema de archivos, el cual puede ser un archivo o un directorio | `EntrySync` |
| `DirectoryEntry` | Representa un directorio en el sistema de archivos | `DirectoryEntrySync` |
| `DirectoryReader` | Permite leer un directorio en el sistema de archivos | `DirectoryReaderSync` |
| `FileEntry` | Representa un archivo en el sistema de archivos | `FileEntrySync` |
| `FileError` | Error lanzado cuando falla el acceso al sistema de archivos | `FileException` |

## History

Con la *History API* podemos simular entradas en el historial del navegador sin necesidad de realizar peticiones al servidor donde la aplicación está alojada.

## Websocket