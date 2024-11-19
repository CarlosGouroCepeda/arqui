import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname= path.dirname(fileURLToPath(import.meta.url));



const app = express();
app.set('port',4000);
app.listen(app.get('port'));
console.log('Servidor corriendo en puerto', app.get('port'));

app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res)=> res.sendfile(__dirname + '/pages/login.html'))

app.use('/assets', express.static('assets'));

