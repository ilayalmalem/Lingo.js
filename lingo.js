//Set the LingoError class
function LingoError(message) {
    this.name = "LingoError";
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
            console.log(`Key: ${key} | Value: ${value}`)
        }
    }
    replaceElementWithDataValue(){

        /*LM attribute =>
        The lm attribute stands for: Lingo model if an element has it, it will also have control
        Of the value of the attribute from the data object.
        For example: <p lm="greeting"> will control the greeting variable in the data object.
        It will add a onchange event to it and everytime it will change, the data object will update and all the elements
        With the lc(Lingo content) attribute will change
        */
       //This will check if elements have the lm attribute and will set everything
        for (var k = 0; k < $(this.element).length; k++) {
            var data = this.data;
            //Set the effected element to be the element with the attribute   
            let element = $(this.element)[k];
            if (element.hasAttribute("lm")) {
                //Then assign them the events for lm elements
                //Get attributes such as lm and change the attributed elements to the real time values of them
                var attribute = $(this.element).eq(k).attr('lm');
                //If the attribute is an actual varaible passed in the data object
                if(attribute in this.data) {    
                    //Change the element text to be the current value of the attribute instace in the data object.
                    $(this.element).eq(k).val(this.data[attribute])
                    $(this.element).eq(k).text(this.data[attribute])
                    //Add a change event listener to the model and every time its value changes, the data object key value changes.
                    //And then all the other elements with lv attribute is changes aswell 
                    
                    function boundEvent (data,element){
                        let oldData = data[attribute];
                        data[attribute] = $(element).val();
                        alert(`Changed data object value from ${oldData} to ${data[attribute]}`)
                    }

                    alert(this.data[attribute]);
                    element.addEventListener('keyup',function () {
                        boundEvent(data,element)
                    });

                    
                }
                else { 
                    //If the key was not found in the data object
                    throw new TypeError(`Model attribute ${attribute} doesnt exist in the data object. make sure to add it in the data object. \n at sub-element <${element.tagName}> \n Id:${element.id} \n ClassName: ${element.className}`)
                }
            }
        }
        //This will check elements with the lv attribute {version 0.0.2}
    }
}

var lingo = new Lingo(".s",
{
    d:'text',
    lingo:'ds'
}
)

lingo.replaceElementWithDataValue()