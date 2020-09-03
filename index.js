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
    setForLoops() {
        var elements = document.querySelectorAll('[repeat]')
        elements.forEach((element) => {
            var statement = element.getAttribute('repeat')
            var repeatorLiteral = statement.substr(0, statement.indexOf('in')).trim()
            var object = statement.split('in').pop().trim();
            var repeator = repeatorLiteral
                try {
                    console.log(`${repeatorLiteral} in ${object}`)
                    for (repeatorLiteral in this.data[`${object}`]) {
                        if(element.textContent.includes('{')) {
                            let t = element.textContent.replace('{','')
                            t = t.replace('}','')
                            element.textContent = t

                            var newLit = element.textContent.replace(`${repeator}`,`${this.data[`${object}`][`${repeatorLiteral}`]}`)
                            var exec = eval(`this.data.${element.textContent}`)
                            element.textContent = exec
                            alert(exec)
                        }
                    }
                }
                catch(e) {
                    console.log(e)
                }
        })
    }
}

window.Lingo = Lingo