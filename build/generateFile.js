const fs = require('fs');
function createComponentTemplate(name) {
    return `import Lingo from '../index.js';

class ${name} extends Lingo.Component{
    mounted() {

    }
    
    rendered() {

    }
}
export default ${name};
`;
}
function generateFile(name, type) {
    // Handle components
    switch (type) {
        case 'Component':
            var template = createComponentTemplate(name);
            fs.writeFile(`assets/components/${name}.js`, template, (err) => {
                if (err)
                    return `There was a problem creating your file. \n ${err}`;
                return `${type} created successfuly!`;
            });
            break;
        case 'Template':
            return 'Template created succesfully.';
            break;
        default:
            break;
    }
    return `${name} + ${type}`;
}
module.exports = {
    generateFile: generateFile
};
