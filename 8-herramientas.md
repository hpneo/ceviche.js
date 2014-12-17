# Capítulo 8: Mejorando el flujo de trabajo

> Trabajar como desarrollador web frontend no solo implica saber HTML, CSS y JavaScript. También debemos conocer herramientas que aligeran el flujo de trabajo y reducen tiempo en tareas que llegan a ser repetitivas.

## RequireJS

Cuando se trabajan aplicaciones, es necesario separar el código de acuerdo a sus responsabilidades, es decir, lo que realiza cada parte del código, y una buena forma de hacerlo es mediante el [patrón Module](2-funciones#module). De esta forma, separamos el código por responsabilidades, y este se vuelve código reusable.

Sin embargo, si los módulos que creamos dependen de otros módulos (como seguramente será), vamos a tener problemas. En un documento HTML, deberíamos definir primero el módulo que no depende de nadie (llamado módulo `a.js`), luego definir el módulo que depende de `a.js` (el cual será llamado `b.js`), para luego definir al módulo que depende de `b.js`, si existiera, y así sucesivamente. El código quedaría así:

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

Pero esto no es óptimo. Si en algún momento `b.js` ya no depende de `a.js`, o `a.js` empieza a depender de un módulo nuevo, las cosas se complican más. Incluso, podría darse el caso que `a.js` empieza a depender de `c.js`, y este sigue dependiendo de `b.js` (lo cual pasa, pero debería hacerse lo posible para que no suceda). Es aquí donde aparece [RequireJS](http://requirejs.org/).

RequireJS solo necesita una etiqueta `<script>`, y permite definir módulos con sus respectivas dependencias, para luego cargar cada archivo con el módulo correspondiente según sea necesario. Para utilizar RequireJS se va a la [sección de descargas](http://requirejs.org/docs/download.html#requirejs), y luego utilizarlo en el siguiente código:

```html
<script data-main="main" src="require.js"></script>
```

La biblioteca es cargada en una etiqueta `<script>` a la que se define un atributo llamado `data-main`. Este atributo indica la ruta relativa del archivo principal de la aplicación (es decir, la ruta __en relación__ al archivo HTML). Adicionalmente a ello, se puede definir cierta [configuración](http://requirejs.org/docs/api.html#config) para RequireJS en una etiqueta `<script>` aparte:

```html
<script >
  requirejs.config({
    urlArgs: 'timestamp=' + Date.now()
  });
</script>
```

En este caso, definimos agregar un parámetro a la url de cada archivo que cargará RequireJS. Esto, para evitar el caché de los archivos cargados previamente.

## Grunt

En un flujo de trabajo común, vamos a verificar que el código no tenga errores de sintáxis, realizar pruebas unitarias automatizadas, y minificar el código para reducir espacio. Realizar cada una de estas tareas puede tomar tiempo, y son tareas que vamos a realizar siempre cada cierto tiempo, sobre todo después de realizar un cambio fuerte en el código, así que necesitaremos una herramienta que le delegue a la computadora este tipo de tareas. [Grunt](http://gruntjs.com/) es un *task runner*, una herramienta que permite definir y realizar este tipo de tareas automatizadas.

## Bower

Cuando trabajamos con proyectos medianos o grandes, tendremos que utilizar varias bibliotecas, las cuales pueden depender, a su vez, de otras bibliotecas. Si bien hemos visto el manejo de dependencias con RequireJS, esta biblioteca maneja dependencias a nivel __lógico__, pero no a nivel de archivos. [Bower](http://bower.io/) permite manejar este tipo de dependencias, descargando las bibliotecas que necesitemos, y sus dependencias.