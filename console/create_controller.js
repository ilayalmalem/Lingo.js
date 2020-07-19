var Lingo = require('../index.js');
var fs = require('fs');
//Get CLI args
var args = process.argv.slice(2);

//Set name to the first argument
var name = args[0];

//Instantiate new controller class
var con = new Lingo.Controller(name)

con.writeName()

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

fs.writeFile(`./Controllers/${name}.js`, ControllerText, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });