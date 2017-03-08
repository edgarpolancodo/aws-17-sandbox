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
    if(fcontacts)
        res.send(fcontacts);
    else
        res.sendStatus(404);
    console.log('GET contact');
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

app.delete(base+'/contacts/:name', (req, res) => {
    res.sendStatus(200);
    contacts = contacts.filter((contac) => {
        return (contac.name != req.params.name)
    });
    console.log('DELETE contact');
});

app.put(base+'/contacts/:name', (req, res) => {
    var contact = req.body;
    
    var c = contacts.filter((contac) => {
        return (contac.name == req.params.name)
    })[0];
    c.email = contact.email;
    c.name = contact.name;
    c.phone = contact.phone;
    
    res.sendStatus(200);
    //contacts[req.query.index] = contact; 
    //contacts = [];
    console.log('PUT contact');
});


app.listen(port, () => {
    console.log('servidor corriendo...' + process.env.IP)
});
