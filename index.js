// EPPR Plantilla HTML Basico
// Escuela de Programación y Pensamiento Recursivo
// eppr.link
// Autor: @lxps 2020
/*
COMANDOS:
1) Instalar módulos de NODE con NPM:
sudo npm install
2) Correr el servidor de NODE:
node index
*/

const { exec } = require("child_process");
var qrcode = require('qrcode-terminal');
var moment = require('moment');
var express = require('express');

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

server = app.listen(3000, function () {

    // console.log('Para iniciar visita: http://10.55.0.1:3000');
// Corre un comando Shell desde NodeJS.
    // Este comando va a traernos la URL asociada a la dirección local sobre WIFI.
    exec("ifconfig wlan0 | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        // Limpiar respuesta, usualmente incluye la palabra "inet " además de multiples entradas de línea "\n"
        var LAN = stdout.replace("\n", "").replace("\n", "").replace("inet ", "").replace("\n", "")
        // Imprimir Código QR para rápido acceso mediante WiFi.
        qrcode.generate(`http://${LAN}:3000`, { small:true });
        console.log('*** Para usar este código QR debes usar la misma red WiFi en ambos dispositivos')
        console.log('Servidor NODE corriendo en el puerto 3000!');
        console.log(`Click aquí para continuar: http://${LAN}:3000`);
    });

});
app.get('/', function (req, res) {
    res.render('index')
});