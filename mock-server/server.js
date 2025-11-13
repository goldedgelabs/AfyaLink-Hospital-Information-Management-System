const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
const fs = require('fs');
const dataDir = __dirname + '/data';
function read(name){ try { return JSON.parse(fs.readFileSync(dataDir + '/' + name)); } catch(e){ return []; } }
app.get('/api/health', (req,res)=> res.json({ok:true}));
app.get('/api/appointments', (req,res)=> res.json(read('appointments.json')));
app.get('/api/hospitals', (req,res)=> res.json(read('hospitals.json')));
app.get('/api/doctors', (req,res)=> res.json(read('doctors.json')));
app.listen(port, ()=> console.log('Mock server running on', port));
