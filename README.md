## Aplicación front end HR 

En este repositorio se encuentra una aplicación "stand-alone" HTML/JS, que representa el "front-end" del
sistema de recursos humanos de HR Solutions

## Servidor local de desarrollo
El codigo contenido permite ejecutar un servidor local de desarrollo (node.js) que facilita el desarrollo
y despliegue del código de la aplicación. A fin de utilizar el servidor local de desarrollo, se debe 
instalar las dependencias declaradas en el archivo `package.json` ejecutando `npm install` desde la
la raíz de la aplicación.

Los modos en que es posible correr dicho servidor son los 
siguientes: 

```sh
# Modo de desarrollo
# Carga todos los archivos fuente JS / CSS / HTML pre-compilando estilos SASS

$ grunt serve

# Modo de pruebas de despliegue
# Realiza todas las tareas de despliegue, minifica, revisiona y copia archivos fuente
# creando como resultado la carpeta dist, desde donde sirve la aplicación en el servidor
# local de desarrollo

$ grunt serve:dist


# Modo de distribución
# Realiza las tareas de despliegue sin ejecutar el servidor local

$grunt build
```

## Estructura de la aplicación
La aplicación tiene la siguiente estructura:
```
  Gruntfile.js
  bower.json
  package.json
  dist/ 
  node_modules/
  src
  ├── app
  │   ├── app.js
  │   ├── config.js
  │   ├── layouts
  │   ├── modulo1
  │   │   ├── modulo1.js
  │   │   └── modulo1.tpl.html
  │   │   └── main.tpl.html
  │   ├── modulo2
  │   │   ├── modulo2.js
  │   │   └── modulo2.tpl.html
  │   └── modulo3
  │       ├── modulo3.js
  │       ├── abc.tpl.html
  │       └── bcd.tpl.html
  ├── assets
  │   ├── images
  │   └── styles
  │       └── custom.scss
  ├── common
  └── index.html
  vendor/

```

### Gruntfile.js
Este archivo tiene la configuración de tareas necesarias para ejecutar el servidor local de desarrollo
y la distribución del proyecto. Información adicional puede encontrarse en : http://gruntjs.com/

### bower.json
Lista distintos paquetes que son indispensables para el funcionamiento de la aplicación, por ejemplo, 
`angular`, `jquery`, `angular-ui-router`, etc.  El archivo permite mantener fácilmente versiones fijas de 
dichas dependencias, realizar actualizaciones y únicamete realizar seguimiento de los archivos del proyecto
en el sistema de control de versiones. Información adicional acerca de Bower puede encontrarse en : http://bower.io/

A fin de instalar las dependencias del proyecto trás clonar el repo, debe ejecutarse el comando `bower install` 
desde la raíz del proyecto.

Para persistir paquetes, se debe instalar utilizando `bower install --save nombre_paquete` desde la raiz del 
proyecto.

### package.json
Describe la aplicación en el formato `npm`, al igual que las dependencias de paquetes instalables mediante `npm`, 
necesarias para lanzar el servidor local o crear una distribución del proyecto. Mas información está disponible
en https://www.npmjs.com/. 

A fin de persistir depenencias adicionales debe realizarse instalación de paquetes `npm` utilizando el 
comando `npm install --save-dev nombre_paquete`. 

### dist
Folder auto-generado y auto-mantenido, que tendrá los archivos que deben ser copiados al realizar la distribución
de la aplicación. Dichos archivos están minificados y revisionados apropiadamente y constituyen la forma más
eficiente de ejecución de la aplicación HTML/JS.


### node_modules
Folder auto-generado y auto-mantenido que contiene los paquetes instalados mediante `npm install`. 

### src
Contiene el código fuente, imagenes, estilos y plantillas HTML de toda la aplicación. Su estructura como sigue:

#### app
Contiene el código Javascript de los módulos de la aplicación. Un controlador central en `app.js` y la configuración
general de la aplicación en `config.js`.

#### layouts
Contiene esqueletos de HTML para ensamblar el layout general de la aplicación.

#### modulo1, modulo2, ...
Contiene módulos independientes de la aplicación, con sus respectivos controladores y plantillas HTML.

#### common
Contiene servicios, directivas y en general, código reusable por distintos módulos.

### vendor
Folder auto-generado y auto-mantenido


