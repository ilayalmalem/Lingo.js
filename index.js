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
        this.setValues()
        this.parse()
        this.setForLoops()
    }

    setValues() {

        [this.data].forEach((el) => {
            if(typeof el === 'object' && Array.isArray(el)) {
                if(Array.isArray(el)) {
                    alert('s')
                }
                for (const [key, value] of Object.entries(el)) {
                    for (const [childKey, childValue] of Object.entries(value)) {
                        var elements = document.querySelectorAll(`[l-value=${childKey}]`).forEach((els) => {
                            els.value = this.data[`${key}`][`${childKey}`]
                            els.textContent = this.data[`${key}`][`${childKey}`]
                            els.addEventListener('keyup',() => {
                                this.data[`${key}`][`${childKey}`] = els.value.split(',')
                            })
                        })
                    }


                    var elements = document.querySelectorAll(`[l-value=${value[0]}]`).forEach((els) => {
                        els.value = value
                        els.textContent = value
                        els.addEventListener('keyup',() => {
                            this.data[`${key}`] = els.value
                        })
                    })
                }
            }
        })

        for (const [key, value] of Object.entries(this.data)) {
            var elements = document.querySelectorAll(`[l-value=${key}]`).forEach((els) => {
                els.value = value
                els.textContent = value
                els.addEventListener('keyup',() => {
                    this.data[`${key}`] = els.value
                })
            })
        }

        Object.entries(this.data).forEach((el) => {

        })
    }
    async setForLoops() {
        // Get all elements with the repeat attribute, and foreach on them
        var elements = document.querySelectorAll('[repeat]')
        elements.forEach((element,index) => {
            // This is the statement something like this: todo in todod; todo = repeator, object = this.data.todos
            var statement = element.getAttribute('repeat')
            var repeatorLiteral = statement.substr(0, statement.indexOf('in')).trim()
            var object = statement.split('in').pop().trim();
            var repeator = repeatorLiteral
            var blocks = []
            this.data[repeator] = this.data[object]
            var dataCount = 0
            for (const dataC in this.data[object]) { 
                // The times it will run
                dataCount = dataC
            }
            var code = []
            for (let i = 0; i <= dataCount; i++) {
                element.querySelectorAll(`:scope > *`).forEach((el) => {
                    var clone = el.cloneNode()

                    var [props,original] = this.sanitize(el.innerHTML)
                    var interpolations = []
                    original.replace(/\{{(.*?)\}}/gi,(t,m) => interpolations.push(m))
                    interpolations.forEach((int) => {
                        // Replace interpolation
                        original = original.replace(int, eval(`this.data.${repeator}[${i}]${int.replace(repeator,'')}`))
                        clone.innerHTML = original.replace(/[{{}}]/g,'')
                        // console.log(original.replace(/[{{}}]/g,''))
                    })
                    var props = props.replace(repeator, '').trim()
                    code.push(clone)
                })
            }
            element.innerHTML = ''

            code.forEach((co) => {
                element.appendChild(co)
            })
        })
    }

    buildBlock(items,el) {

    }

    sanitize(code) {
        var original = code
        var code = code.substring(
            code.lastIndexOf("{{") + 2, 
            code.lastIndexOf("}}")
        );
        code = code.trim().replace('{{','')
        code = code.trim().replace('}}','')
        return [code,original];
    }

    parse() {
        var elements = document.querySelectorAll('*')
        elements.forEach((el) => {

        })
    }

    getAllSubstrings(str) {
        var i, j, result = [];
      
        for (i = 0; i < str.length; i++) {
            for (j = i + 1; j < str.length + 1; j++) {
                result.push(str.slice(i, j));
            }
        }
        return result;
      }
}

window.Lingo = Lingo