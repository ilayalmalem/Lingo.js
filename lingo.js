//Set the LingoError class
function LingoError(message) {
    this.name = "LingoErro";
    this.message = (message || "");
}
LingoError.prototype = Error.prototype;

class Lingo {
    //Construct the lingo object
    constructor(element,data){
        //Set the main element to the element tag
        this.element = element;
        //Get the data driven varaibles
        this.data = data;
    }
    //Show the data object
    showDataEntries() {
        const entries = Object.entries(this.data)
        for (const [key, value] of entries) {
            alert(`Key: ${key} | Value: ${value}`)
        }
    }
    replaceElementWithDataValue(){
        //Get attributes such as lm and change the attributed elements to the real time values of them
        var attribute = $(this.element).attr('lm');
        //If the attribute is an actual varaible passed in the data object
        if(attribute in this.data) {    
            //Set the effected element to be the element with the attribute
            var el = $(this.element);    
            //Change the element text to be the current value of the attribute instace in the data object.
            $(this.element).text(this.data[attribute])
            //Add a change event listener to the model and every time its value changes, the data object key value changes.
            //And then all the other elements with lv attribute is changes aswell 
            el.addEventListener('change')
        }
        else {
            //If the key was not found in the data object
            throw new LingoError(`Attribute ${attribute} doesnt exist in the data object.`)
        }
    }
}

var lingo = new Lingo(".s",
{
    d:'text',
    v_lingo:'ds'
}
)

lingo.replaceElementWithDataValue()