

const express = require('express');
const router = express.Router();
const dataJSON = require('../metaData');

router.get('/seleccionListado', function(req, res){
        dataJSON.getData()
            .then((data) => {
                let ciudades = [];
                let tipos = [];
                data.forEach((key, idx) => {
                    if (ciudades.indexOf(key.Ciudad) < 0) {
                        ciudades.push(key.Ciudad);
                    }
                    if (tipos.indexOf(key.Tipo) < 0) {
                        tipos.push(key.Tipo);
                    }
                });
                res.json({ "error": false, "ciudades": ciudades, "tipos": tipos });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
})

router.get('/busqueda', function(req, res){
        dataJSON.getData()
            .then((data) => {
                res.json({ "error": false, "datos": data });
            })
            .catch((err) => {
                res.json({ "error": true, "datos": err });
            });		
})


router.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', function(req, res){
        let params = req.params;
        let datos = [];
        dataJSON.getData()
            .then(data => {
                var aux = [];
                var arr2 = [];
                var datos = [];

                aux = data.slice(); 

                if (params.ciudadId != "todas") {
                    aux.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            arr2.push(key);
                        }
                    });
                } else {
                    arr2 = aux.slice();
                }

                aux = [];
                aux = arr2.slice();
                arr2 = [];

                if (params.tipoId != "todos") {

                    aux.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { arr2.push(key); }
                    });
                } else {
                    arr2 = aux.slice();
                }

                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

module.exports = router;