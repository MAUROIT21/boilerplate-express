let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');


// 6 Middleware: registrador(=logguer)
app.use((req, res, next) => {
  console.log(req.method +' '+ req.path +' - '+ req.ip);
  next();
})

// 10 Use body-parser to parse POST requests
let middleWareParser = bodyParser.urlencoded({extended:false});
app.use(middleWareParser);


// 1 Bienvenido a la consola de Node
console.log("Hello World")

// 2 INICIA UN SERVIDOR EXPRESS y muestra un mensaje
/* app.get('/', function (req, res) {
  res.send("Hello Express")
}) */

// 3 Sirve un archivo HTML
absolutePath = __dirname + '/views/index.html'
app.get("/", function(req, res) {
  res.sendFile(absolutePath)
});

absolutePathStatics = __dirname + '/public' // es la ubicacion del archivo style.css
//express.static(path), donde el parámetro path es la ruta absoluta de la carpeta que contiene los recursos.
//app.use(path, middlewareFunction)
app.use('/public', express.static(absolutePathStatics))

// 4 Sirve Json en una ruta especifica
let mensaje = {'message': "Hello json"};
/* app.get('/json', (req, res) => {
  res.json(mensaje)
})
 */
// 5 Usa la variable de entorno .env
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
  /*   convertido = mensaje
    convertido.message = convertido.message.toUpperCase()
    res.json(convertido) */
    res.json(
      {"message": "HELLO JSON"}
    )
  } else {
      res.json(mensaje)
    }
})

// 7 Chaining Middlewares to create a time server

app.get('/now', 
(req, res, next)=>{ // El middleware que crea el atributo time en el request
  req.time = new Date().toString();  // le asigna la fecha actual
  next(); 
},
 (req, res)=>{ // devuelve la fecha
  res.json({time : req.time})
 })

// 8 Get customer path parameter input
// >>> {echo: word}
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})

// 10 Use body-parser to parse POST requests
// app.route(path).get(handler).post(handler)

// 11 Get data from POST requests
app.post('/name', (req, res) => {
  //res.json({name : req.body.first + ', ' + req.body.last});
  res.json({reqBody: req.body})
})




 /////////////////////////////////////
module.exports = app;
