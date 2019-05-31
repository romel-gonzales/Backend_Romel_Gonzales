const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      routes = require('./rutas/index.js');

const port = process.env.PORT || 3000,
      app = express(),
      server = http.createServer(app);
	  
	  
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


server.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port);
});