# Prueba técnica

## Descripción

Prueba tencnica que consume el API https://jsonplaceholder.typicode.com/posts, para ver, editar, eliminar e insertar post. Se utilizó NextJS para desarrollarla y en ella se pueden ver tecnicas de SSR, ContextAPI, CRUD Local Storage.

Tenga encuenta que la version de NodeJS debe ser superior a 18.7.2

```bash
# clone el repositorio https://github.com/Ingcruzco/colmena.git
git clone https://github.com/Ingcruzco/colmena.git
cd colmena
git checkout master
npm install
npm run dev
# Abra la url http://localhost:3000 en la navegador
```

Para ejecutar las pruebas unitarias

```bash
npm run test
```

se utilizó la técnica getServerSideProps para el SSR para cada detalle del Post, de modo que el detalle del Post se calcula del lado del servidor.

### Docker despliegue
en la raiz del proyecto ejecute los siguientes comandos:

```bash
# primero construya la imagen
docker build -t prueba-colmena:1.0 .
# ejecutela
docker run -p 3000:3000 prueba-colmena:1.0
```