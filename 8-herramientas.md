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

Pero esto no es óptimo. Si en algún momento `b.js` ya no depende de `a.js`, o `a.js` empieza a depender de un módulo nuevo, las cosas se complican más. Incluso, podría darse el caso en el que `a.js` empieza a depender de `c.js`, y este sigue dependiendo de `b.js` (lo cual pasa, pero debería hacerse lo posible para que no suceda). Es aquí donde aparece [RequireJS](http://requirejs.org/).

RequireJS solo necesita una etiqueta `<script>`, y permite definir módulos con sus respectivas dependencias, para luego cargar cada archivo con el módulo correspondiente según sea necesario. Para utilizar RequireJS es necesario [descargarlo](http://requirejs.org/docs/download.html#requirejs), en este caso al mismo nivel del archivo HTML, y luego llamar a la biblioteca agregando la siguiente etiqueta:

```html
<script data-main="main" src="require.js"></script>
```

La biblioteca es cargada en una etiqueta `<script>` a la que se define un atributo llamado `data-main`. RequireJS necesita un archivo principal desde donde empezar a cargar la aplicación, usualmente llamado `main.js`. El atributo `data-main` indica la ruta de ese archivo  __en relación__ al archivo HTML.

Adicionalmente a ello, se puede definir cierta [configuración](http://requirejs.org/docs/api.html#config) para RequireJS en una etiqueta `<script>` aparte:

```html
<script >
  requirejs.config({
    urlArgs: 'timestamp=' + Date.now()
  });
</script>
```

Por ejemplo, utilizando este código tendremos que cada archivo cargado por RequireJS tendrá una dirección parecida a `archivo.js?timestamp=1418873637178`. De esta forma, el navegador evitará guardar en caché a estos archivos (útil cuando probamos un código muy seguido y necesitamos que el navegador siempre utilice el archivo real).

## Grunt

En un flujo de trabajo común vamos a verificar que el código no tenga errores de sintáxis, realizar pruebas unitarias automatizadas, y minificar el código para reducir espacio, entre otras acciones. Realizar cada una de estas tareas puede tomar tiempo, y las vamos a realizar siempre cada cierto tiempo, sobre todo después de realizar un cambio fuerte en el código, así que es vital tener una herramienta que le delegue a la computadora este trabajo tedioso y aburrido. [Grunt](http://gruntjs.com/) es un *task runner*, una herramienta que permite definir y realizar este tipo de tareas automatizadas.

Para utilizar Grunt necesitamos [Node.js](http://nodejs.org/), una plataforma que permite ejecutar JavaScript fuera del navegador, el cual también instalará la herramienta de comandos `npm`. Luego de esto, es necesario instalar la herramienta `grunt-cli` utilizando el comando `npm`:

```
npm install -g grunt-cli
```

Con esto ya tenemos instalado el comando `grunt` en nuestra consola, el cual es necesario para ejecutar las tareas.

El siguiente paso es crear un archivo `package.json` en la raíz de la carpeta del proyecto. Este archivo es utilizado para definir los paquetes de [NPM](https://www.npmjs.com) (el repositorio de paquetes de Node.js) a utilizar en el proyecto, pero en este caso lo usaremos para trabajar con Grunt:

```javascript
{
  "name": "buena-espina",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5"
  }
}
```

Este archivo contiene 3 propiedades principales, pudiendo tener más: el nombre del proyecto, la versión y las dependencias del proyecto (en este caso, los plugins para Grunt).

Lo siguiente que tenemos que hacer es instalar el paquete `grunt` desde NPM (lo que instalamos líneas arriba solo era el comando para consola, pero también necesitamos la biblioteca que permita utilizar los plugins de Grunt):

```
npm install
```

`npm install` es un comando que descargará cualquier paquete definida como parámetro, o los paquetes definidos en un archivo `package.json`, de existir uno. Vamos a utilizar este comando cada vez que querramos instalar una biblioteca definida dentro del archivo `package.json`. Por ejemplo, para agregar un plugin de Grunt al proyecto podemos utilizar el siguiente comando en la consola:

```
npm install grunt-contrib-jshint --save-dev
```

`grunt-contrib-jshint` es un plugin para Grunt que permite utilizar JSHint, una herramienta que analiza el código y lanza advertencias sobre su calidad y posibles errores que pueda tener.

Utilizando la propiedad `--save-dev` guardaremos `grunt-contrib-jshint` dentro de `devDependencies`:

```javascript
{
  "name": "buena-espina",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0"
  }
}
```

Luego de agregar todos los módulos, debemos crear un segundo archivo, llamado `Gruntfile.js`, el cual también debe estar en la raíz del proyecto.

Un archivo `Gruntfile.js` es un módulo de Node.js; esto es, una función que es guardada en `module.exports`:

```javascript
module.exports = function(grunt) {};
```

Dentro de esta función, debemos realizar 3 pasos:

 1. Definir la configuración de cada plugin.

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['scripts/index.js'],  // definir los archivos que se analizarán
      options: {
        curly: true,    // usar siempre llaves en bloques como if, while, for
        eqeqeq: true,   // usar === en vez de ==
        browser: true,  // evita lanzar advertencias sobre variables globales relacionadas al navegador
        globals: {      // evita lanzar advertencias sobre variables globales específicas
          jQuery: true
        }
      }
    }
  });
};
```

 2. Cargar los módulos de Node.js, definidos en el archivo `package.json`.

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    // ...
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
```

 3. Registrar las tareas de cada módulo.

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    // ...
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
```

Al final, el archivo `Gruntfile.js` quedaría así:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['scripts/index.js'],
      options: {
        curly: true,
        eqeqeq: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
```

Por último, para correr las tareas, solo basta con ejecutar el siguiente comando en la consola:

```
grunt
```

## Bower

Cuando trabajamos con proyectos medianos o grandes, tendremos que utilizar varias bibliotecas, las cuales pueden depender, a su vez, de otras bibliotecas. Si bien hemos visto el manejo de dependencias con RequireJS, esta maneja dependencias a nivel __lógico__, pero no a nivel de archivos. [Bower](http://bower.io/) permite manejar este tipo de dependencias (de archivos), descargando las bibliotecas que necesitemos, así como sus dependencias.