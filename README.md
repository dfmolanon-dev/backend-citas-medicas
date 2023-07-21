# template node JS
it is a node JS template struct.

## SCR
Folder principal del aplicativo el cual contiene la logica pertinente de los componente y sus respectivas conexiones. 
En **scr** tendremos una estructura compuesta por lo siguiente
### API
Api contendrà los componentes propios del aplicativo REST de Node y a su vez tendrà la siguiente estructura
#### Components
Se tiene el corazon de los componentes, como lo son las rutas, los controladores, modelos, repositorios, politicas y test.
Donde un componente tiene como objetivo representar un proceso importante dentro del desarollo como lo puede ser una entidad o casos de uso generales

**clients** que son los procesos localesque se encargan de la logica de comunicaciòn o particularidades del proceso de comunicacion de los entes externos. Normalmente son varios procesos como podria ser conexion a una API externa, conexion a un servicio de nube, redis, kafka, etc
**controller.js(ts)** es la clase que maneja los request entrantes y envia la respuesta del back hacia el usuario final
**model.js(ts)** representa los modelos de la base de datos para el componente, donde se tiene la estructura de datos a usar por componente y es usado normalmente por el repositorio
**policy.js(ts)** permite manejar las reglas de acceso a las operaciones (Esta basado en roles)
**repository.js(ts)** es un interpretador para la base de datos y es lo que normalmente se importa como modelo para realizar los procesos de insercion, actualizacion, selecciòn y borrado de datos sobre la base de datos, es aqui donde el ORM interactua.
**service.js(ts)** Se encargara de toda la logica del componente
**routes.js(ts)** la redireccion de los endpoints del componente, es el que asigna los metodos del controlador.
**<componente>.spec.js(ts)** archivo relacionado con los test
#### Middleware 
Carpeta que contiene todos los procesos de autenticacion y validacion, loggin o procesos de auditoria posterior a un request.
#### routes.js
Es el que se encarga de registrar todas las rutas que pasan a traves del middleware y de los componentes 
#### Server.js
Es donde se inicializa el servicio y se configura absolutamente todo lo que requiere el servidor de express.
Importación de middleware, componentes, rutas
Manejo de errores
Configuraciones de puertos
### Config
Es un dirrectorio que contiene todos los procesos que se encargan de configurar la aplicación a nivel transversal
**variales globales** variables que son globales para toda la aplicación
* **logger** configuración propia o especifica del el logueo, como lo es la estructura del mensaje, que tipos se requiere, que nivel de alerta se propagará, etc.
**ACL (Access Control List)** Lista de control de acceso
### Test
Son test que permiten correr los test de cada uno de los componentes.
### app.js
En este archivo se realiza la inicialización del servicio.
### utils(opcional)
Tiene servicios generales que pueden ser usados por los componentes o cualquier servicio dentro del aplicativo, es importante recalcar que son procesos muy generales y que no deben resolver particularidades del servicio.

## Configuración proyecto
El primer paso es crear "package.json" , a partir del comando **npm init**
    name: Nombre del proyecto
    versión: Versión del proyecto
    description: Descripción breve del proyecto
    entry point: El archivo principal (main) del aplicativo
    test command Si uno tiene test unitarios acá se especifica el comando para ejecutarlo
    git repository: la ruta del repositorio en el que se encuentra el codigo
    keywords: Palabras claves del proyecto
    author: Autor y propietario del proyecto.
    license: Especifica un licencia sobre la que se quiere distribuir el proyecto.

Instalar typescript **npm install typescript** 
Instalar dependencias tales como:
    express **npm install express**
    ts-node **npm install ts-node --save-dev**
    types/express **npm install @types/express**

Crear un tsconfig por defecto con el comando **npx tsc --init**, y luego activamos la opción de **outDir** dentro del archivo y definimos la carpeta que contiene el archivo main (intex.ts o app.ts)

Para correr el proyecto desde el main se hace uso del comando **npx ts-node src/app.ts**
Para la migraciones se debe instalar la dependencia del ORM llamado **knex**, donde haremos uso del comando **npm install knex knex-cli pg --save-dev**

Para leer variables de entorno instalamos la libreria de dotenv **npm install dotenv --save-dev**

POSTGRES_URI=postgresql://<usuario_db>:<password_db>@<host_db>:<port_db>/<database>

















