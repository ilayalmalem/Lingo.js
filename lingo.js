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
        const entries = Object.entries(this.data.Models)
        console.table(this.data.Models);
    }
    replaceElementWithDataValue(){
        //Display attribute values to the lv models
        var self = this;
        $('[lv]').each(function(){
            //This means the element
            var attribute = $(this).attr('lv');
            this.textContent = self.data.Models[attribute]
        });
        /*LM attribute =>
        The lm attribute stands for: Lingo model if an element has it, it will also have control
        Of the value of the attribute from the data object.
        For example: <p lm="greeting"> will control the greeting variable in the data object.
        It will add a onchange event to it and everytime it will change, the data object will update and all the elements
        With the lc(Lingo content) attribute will change
        */
       //This will check if elements have the lm attribute and will set everything
        for (var k = 0; k < $(this.element).length; k++) {
            var data = this.data.Models;
            //Set the effected element to be the element with the attribute   
            let element = $(this.element)[k];
            if (element.hasAttribute("lm")) {
                //Then assign them the events for lm elements
                //Get attributes such as lm and change the attributed elements to the real time values of them
                var attribute = $(this.element).eq(k).attr('lm');
                //If the attribute is an actual varaible passed in the data object
                if(attribute in this.data.Models) {    
                    //Change the element text to be the current value of the attribute instace in the data object.
                    $(this.element).eq(k).val(this.data.Models[attribute])
                    $(this.element).eq(k).text(this.data.Models[attribute])
                    //Add a change event listener to the model and every time its value changes, the data object key value changes.
                    //And then all the other elements with lv attribute is changes aswell 
                    
                    function boundEvent (data,element){
                        let oldData = data[attribute];
                        data[attribute] = $(element).val();
                        // alert(`Changed data object value from ${oldData} to ${data[attribute]}`)
                    }
                    var self = this;
                    element.addEventListener('keyup',function () {
                        boundEvent(data,element)
                        self.updateLVTags(attribute)
                    });
                }
                else { 
                    //If the key was not found in the data object
                    throw new TypeError(`Model attribute ${attribute} doesnt exist in the data object. make sure to add it in the data object. \n at sub-element <${element.tagName}> \n Id:${element.id} \n ClassName: ${element.className}`)
                }
                //If the Element has the -n attribute
                if (element.hasAttribute('-n')){
                    //Then a LingoNetwork class should be instantiated
                    var networkWorker = new LingoNetwork(element,this.data);
                    console.log(networkWorker)
                    networkWorker.postAndGet('http://192.168.64.3/post-tester/post.php',{
                        'name': 'Wayne',
                    })
                    
                }
            }
        }
        //This will check elements with the lv attribute {version 0.0.2}
        /*
        LV tag- elements with this attribute will receive their data in real time from the data object
        */
    }
    updateLVTags(model){
        var data = this.data.Models;
        //This will loop over all elements with the lv attribute
        var attE = `[lv=${model}]`;
        $(attE).each(function(){
            //This means the element
            this.textContent = data[model]
        });
    }
}

//LingoNetwork class
/*
This class will basicly add Network functionality to Lingo models.
Attributes:
-n : will initalize the LingoNetwork class that will send AJAX requests and will return real time data 
from the database.
*/
class LingoNetwork extends Lingo {
    constructor (element,data) {
        super(element,data)
        this.element = element;
        this.data = data;
    }
    /* Post and get method
    *  This method will post to a certain URL, get all data,and repeat(optional).
    *  This is just one line of code instead of 30
    *  Theres option for Headers and AJAX preparation such as @csrf token
    *  Data is an object
    */
    postAndGet(URL,data,repeat) {

        $.ajax({
            type: "POST",
            url: URL.toString(),
            data: data,
            cache: false,
            success: function(response){
                alert(response)
                return response;
            }
        }).fail(function () {
            throw new Error('The request has failed.');
        })
    }
}



var lingo = new Lingo(".s",{
    Models:{
        d:'s',
        lingo:'[]'
    }}
)
// Lingo.make(new LingoTestUnit exceptionControl --vm="username" --main)
lingo.replaceElementWithDataValue()

