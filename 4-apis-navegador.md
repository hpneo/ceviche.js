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

Algunas de las siguientes APIs del navegador servirán para **La Buena Espina**, pero utilizarlas no implica que estemos creando una aplicación web, puesto que ese término está mas dirigido a la función del producto que se haga y no a las tecnologías que utilice.

## Application Cache

## File

## File System

## Geolocation

## History

## Screen orientation

## Storage

## Websocket