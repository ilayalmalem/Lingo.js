var Lingo = require('../index.js');
var mkdirp = require('mkdirp');
var fs = require('fs');
//Get CLI args
var args = process.argv.slice(2);

//Set name to the first argument
var name = args[0];

//Instantiate new controller class
var con = new Lingo.Controller(name)

var ControllerText = 
`const Lingo = require('../index.js')
class ${name} extends Controller {
    //Build something amazing!
    constructor(name){
        //Inherit variables
        super(name)
        this.name = name;
    }
    show() {
        return this.writeName()
    }
}`;
fs.mkdir('./assets',function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
    } else {
        //debug
        console.log(e);
    }
});

fs.mkdir('./assets/controllers',function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
    } else {
        //debug
        console.log(e);
    }
});

fs.mkdir('./assets/templates',function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
    } else {
        //debug
        console.log(e);
    }
});

fs.writeFile(`./assets/controllers/${name}.js`, ControllerText, function (err) {
    if (err) throw err;
    console.log('Updated!');
});