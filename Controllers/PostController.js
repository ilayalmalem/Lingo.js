const Lingo = require('../index.js')

class PostController extends Lingo.Controller {

    //Build something amazing!
    constructor(name){
        //Inherit variables
        super(name)
        this.name = name;
    }
    static show() {
        return super.writeName()
    }
    static post() {
        console.log(Lingo.Lingo);
    }
}

