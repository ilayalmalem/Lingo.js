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
        // Get all elements with the repeat attribute, and foreach on them
        var elements = document.querySelectorAll('[repeat]')
        elements.forEach((element,index) => {
            // // Get the data to be looped on

            // var interpolations = element.textContent.split(/[{}]/);
            
            // interpolations.forEach((interpolation,index) => {
            //     // element.textContent = this.sanitize(element.textContent)
            //     var attrs = interpolation.replace(repeator, '').trim()
            //     var isObject = attrs == '' ? true : false;

            //     var displayed = []
            //     if(isObject) {
            //         for(const key in this.data[object]) {
            //             var o = this.data[object][key]
            //             Object.values(o).forEach((k) => {
            //                 displayed.push('<div>' + k + '</div>')
            //             })
            //         }
            //         interpolations = displayed.join('')
            //     }else {
            //         // interpolations[index] = eval(`this.data.${object}${isObject ? '' : '[0]' }${attrs}`)
            //     }

            // })

            // console.log(interpolations)

            // var srctext = element.textContent
            // var re = /(.*{\s+)(.*)(\s+}.*)/;
            // element.textContent = element.textContent.replace(re,interpolations )

            // This is the statement something like this: todo in todod; todo = repeator, object = this.data.todos
            var statement = element.getAttribute('repeat')
            var repeatorLiteral = statement.substr(0, statement.indexOf('in')).trim()
            var object = statement.split('in').pop().trim();
            var repeator = repeatorLiteral

            element.querySelectorAll('*').forEach((el) => {
                // Replace with interpolation
                el.textContent = this.sanitize(el.textContent)

                var props = el.textContent.replace(repeator, '').trim()
                var inter = []
                if(props) {
                    var da = eval(`this.data['${object}']`)
                    for(const io in da){
                        inter.push(eval(`this.data.${object}[${io}]${props}`))
                    }
                }
                else {
                    inter.push(eval(`this.data.${object}`))
                }
                el.textContent = ''
                console.log(inter)
                inter.forEach((int,index) => {
                    var duplicate = el.cloneNode()
                    duplicate.innerHTML = int
                    element.appendChild(duplicate)
                    // el.textContent += el.textContent.replace(el.textContent,inter[index])
                    // element.innerHTML += el.innerHTML
                })
            })

        })
    }

    sanitize(code) {
        code = code.trim().replace('{','')
        code = code.trim().replace('}','')
        return code;
    }
}

window.Lingo = Lingo