var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');
var port = (process.env.PORT || 3000);
var app = express();


var contacts = [{
    name: 'Edgar',
    phone: '809829849',
    email: 'edgar@edgar.com'
}, {
    name: 'Rosangel',
    phone: '849829809',
    email: 'rosangel@rosangel.com'
}];

app.use(bodyParser.json());

var base ='/api/v1'

//console.log(cool());
app.get(base+'/contacts', (req, res) => {
    res.send(contacts);
    console.log('GET contacts');
});

app.get(base+'/contacts/:name', (req, res) => {
    
    var fcontacts = contacts.filter((contact) => {
        
        return (contact.name == req.params.name)
    })[0];
    
    res.send(fcontacts);
    console.log('GET contacts');
});

app.post(base+'/contacts', (req, res) => {
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(201);
    console.log('POST contact');
});

app.get('/', (req, res) => {
    res.send('<html><body><h1>Hola cliente' + cool() + '</h1></body></html>');
    console.log('New request');
});

app.delete(base+'/contacts', (req, res) => {
    res.sendStatus(200);
    contacts = [];
    console.log('DELETE contacts');
});

app.put(base+'/contacts/:name', (req, res) => {
    var contact = req.body;
    
    contacts.filter((contac) => {
        return (contac.name == req.params.name)
    })[0] = contact;
    
    res.sendStatus(200);
    //contacts[req.query.index] = contact; 
    //contacts = [];
    console.log('PUT contacts');
});


app.listen(port, () => {
    console.log('servidor corriendo...' + process.env.IP)
});
