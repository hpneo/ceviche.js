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

* Local Storage: Existiendo uno por cada *origen* (el valor devuelto por `location.origin`). Estará disponible luego de haber cerrado el navegador.
* Session Storage: Solo está disponible mientras el navegador esté abierto.

Estos valores sobreviven a pestañas cerradas y recargadas, similar a las *cookies*, excepto que estas tienen un tamaño máximo, [y otras limitaciones](http://diveintohtml5.info/storage.html#divingin). Sin embargo, tanto el Local Storage como el Session Storage tienen un tamaño máximo de 5 megabytes por *origen*.

Un punto importante a resaltar es que ambos *Storages* se comportan como objetos planos globales, y guardan tanto los nombres como los valores en forma de cadenas. Adicionalmente, tienen dos métodos para acceder y asignar valores: `getItem` y `setItem`.

## Geolocation

El dueño de **La Buena Espina** quiere que el sitio web de su restaurante invite al usuario a ir a sus locales, y una forma de lograr eso es indicarle a sus posibles clientes la ubicación exacta de sus locales. Pero con eso no basta, porque también podría indicarle al potencial cliente **cómo llegar** a alguno de sus locales, dependiendo de un dato que ahora es más fácil de conseguir: la *geolocalización*.

La *Geolocation API* utiliza diferentes formas para conocer la ubicación de un usuario (o, mejor dicho, del equipo que está utilizando un usuario), difiriendo cada forma en la precisión de la ubicación; y, cuando esta API logra encontrar la ubicación del equipo, devuelve un objeto con 2 valores básicos: la latitud y la longitud. Estos valores numéricos permiten ubicar un lugar en la Tierra a partir de un sistema de coordenadas único para todo el mundo, así que podemos tener la certeza que el valor que devuelva esta API será (relativamente) exacto.

## Application Cache

## File

## File System

## History

## Websocket