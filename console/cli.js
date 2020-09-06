#! /usr/bin/env node

const [,, ...args] = process.argv
const inquirer = require('inquirer')

const lingoCLI = require('./commands/generateFile')

var empty;
const childCommands = [
    'make:template'
]

const commandDescription = [
    'Will create a controller.',
    ' Will create a attribute.',
    '  Will create a new template.'
]

const commandFlags = [
    ['--force','--logical'],
    ['--dataToggle','@override','--templateable'],
    ['--force','--publish']
]

const commands = [
    'make',
    'g'
]
if(args[0] == '' || args == '') {
    empty = true;
}
//Check if its in the commands array
if (!empty && !commands.includes(args[0])) {
    console.log(`Command not found: ${args[0] ? args[0] : args}`)
}

if(args[0] == '' || args == '') {
    console.log('Welcome to lingoJS!')
}

function printHelp(comName,comDescription,comChildNames,comChildDesc,params,flags){
    //Print name
    process.stdout.write(`\n \x1b[33m Usage:`);

    process.stdout.write(`\n  \x1b[33m \x1b[1m${comName}:`); //Command name
    process.stdout.write(`\x1b[0m${comDescription}`); //Command description
    process.stdout.write(`\n\t\x1b[33m Namespace commands:`); //Command child name

    //Get all the child commands and flags
    comChildNames.forEach((name ,index) => {
        process.stdout.write(`\n\t\x1b[33m ${index} \x1b[33m\x1b[1m ${name}:`); //Command child name

        process.stdout.write('    ')

        process.stdout.write(`\x1b[0m${comChildDesc[index]}\t${commandFlags[index]}`); //Command child description 
    });
    console.log('\n')
}

//Check for make: commands
switch (args[0]) {
    case 'make':
        printHelp('make','This command will create an asset in your assets directory. availble commands:',childCommands,commandDescription,'',commandFlags)
        break;

    case 'g':
        console.log('Select file to generate. to avoid this dialog next time provide a -t parameter.')
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'File',
                message: 'Select file to generate:',
                choices: ['Component', 'Template'],
            },
        ])
        .then(type => {
          console.info('Answer:', type.File);
          inquirer.prompt([
              {
                  type:'input',
                  name:'name',
                  message:'What is the files name?'
              }
          ]).then((name) => {
              // generate file
              if(name.name == '') {console.log(`Your ${type.File.toLowerCase()} needs a name!`);return;}
              else {
                const res = lingoCLI.generateFile(name.name,type.File)
                console.log(res)
              }
          })
        });
    default:
        break;
}
