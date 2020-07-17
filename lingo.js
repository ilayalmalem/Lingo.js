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
        var data = this.data;
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
       var DOMElements = $('body').find('[lm]');
       var self = this;
       DOMElements.each(function(){
            var data = self.data.Models;
            if(this.hasAttribute('lm')){
                //Grant master permissions
                var attribute = $(this).attr('lm');
                if(attribute in data) {
                    //If the attribute is in the data object
                    $(this).val(data[attribute]);
                    $(this).text(data[attribute]);
                }
                function boundEvent (data,element){
                    let oldData = data[attribute];
                    data[attribute] = $(element).val();
                    // alert(`Changed data object value from ${oldData} to ${data[attribute]}`)
                }
                this.addEventListener('keyup',function () {
                    boundEvent(data,$(this))
                    self.updateLVTags(attribute)
                });
                this.addEventListener('change',function () {
                    boundEvent(data,$(this))
                    self.updateLVTags(attribute)
                });
            }
            else { 
                //If the key was not found in the data object
                throw new TypeError(`Model attribute ${attribute} doesnt exist in the data object. make sure to add it in the data object. \n at sub-element <${this.tagName}> \n Id:${this.id} \n ClassName: ${this.className}`)
            }
        })

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
    //This will change all tags when the data object has been modified through the console
    updateAllTags() {
        var self = this;
        setInterval(function() {
            var data = self.data.Models;
            //This will loop over all elements with the lv attribute
            var attE = `[lv]`;
            $(attE).each(function(){
                var attribute = $(this).attr('lv');
                //This means the element
                this.textContent = data[attribute]
                $(this).val(data[attribute])
            });
            //Loop over lm models
            var attM = `[lm]`;
            $(attM).each(function(){
                var attribute = $(this).attr('lm');
                //This means the element
                this.textContent = data[attribute]
                $(this).val(data[attribute])
            });
        },500)
    }
    //Create all network workers
    createNetworkWorkers() {
        var DOMElements = $('body').find('*');
        //Loop therough all elements in the body
        DOMElements.each(function(){
            //If they have the -n attribute
            if (this.hasAttribute('-n')){
                var element = $(this);
                var cap = '';
                //Then a LingoNetwork class and a new network worker should be instantiated
                var networkWorker = new LingoNetwork(element.className,this.data);
                //If the element has a -si attribute and a -sit that returns typeof of number
                if(this.hasAttribute('-type')) {
                    var type = $(element).attr('-type');
                }
                else {
                    type = "POST"
                }
                if(this.hasAttribute('-set')) {
                    var setType = $(element).attr('-set');
                }
                else {
                    setType = "POST"
                }
                if(this.hasAttribute('cap')){
                    var cap = $(element).attr('cap');
                }
                //Intervals and caps
                if(this.hasAttribute('-si') && this.hasAttribute('-sit')){
                    var interval = $(element).attr('-sit')
                        networkWorker.postAndGet('http://192.168.64.3/post-tester/post.php',{
                            'name': 'Wayne',
                        },interval,setType,type,$(element),cap)
                }   

                if(!this.hasAttribute('-si') && this.hasAttribute('-sit')) {
                    // trigger without interval
                    networkWorker.postAndGet('http://192.168.64.3/post-tester/post.php',{
                        'name': 'Wayne',
                    },'STORE',type)
                    }
                }
        })
    }
}

//LingoNetwork class
/*
 *  This class will basicly add Network functionality to Lingo models.
 *  Attributes:
 *  -n : will initalize the LingoNetwork class that will send AJAX requests and will return real time data 
 *  from the database.
 * 
 *  -si : sendInterval : 
 *  Params:
 *  (-si)1.*{True | False}-weather it will be sent to the server by an interval.
 *  (-sit)2.*{Seconds-int-<400}-Set the interval timing
 *  (-data)3.*{Data-any type- Well formatted JSON if it's an Stringifable variable}
 *  (-url)4.*{URL-If set in the setting object in the Models array then URL='preset', else URL='Well formatted URL'}-Set the URL to send data
 *  (-type)5.Optional-{POST(0)|GET(1)}-Determine if the request will be post or a get request
 *  (-set)6.-Optional-{SET|STORE}-Determine if the request result will be set to be the element content
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
    postAndGet(URL,data,repeat,set,type,element,cap) {
        var counter = 0;
        //If there's an interval
        if(typeof repeat != null){
            var looper = setInterval(function () {
                counter++;
                $.ajax({
                    type: type,
                    url: URL.toString(),
                    data: data,
                    cache: false,
                    success: function(response){
                        console.log(response)
                        if(set == 'SET' && typeof set != null) {
                            element.text(response)
                            element.val(response)
                        }
                        return response;
                    }
                }).fail(function () {
                    throw new Error('The request has failed.');
                })
                if(cap != '' && counter >= cap) {
                    clearInterval(looper)
                }
            },repeat);
        }
        else{
            $.ajax({
                type: "POST",
                url: URL.toString(),
                data: data,
                cache: false,
                success: function(response){
                    console.log(response)
                    return response;
                }
            }).fail(function () {
                throw new Error('The request has failed.');
            })
        }
    }
}



var lingo = new Lingo(".s",{
    Models:{
        d:'s',
        lingo:'[]'
    }}
)

// Currently always false, but will add more ways to check weather the data object has been changed
if(typeof lingo.data.Models == 'string') {
    lingo.updateAllTags()
}

// Lingo.make(new LingoTestUnit exceptionControl --vm="username" --main)
lingo.replaceElementWithDataValue()

lingo.createNetworkWorkers()
