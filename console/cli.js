#! /usr/bin/env node

const [,, ...args] = process.argv
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
]
if(args[0] == '' || args == '') {
    empty = true;
}
//Check if its in the commands array
if (!empty && !commands.includes(args[0])) {
    console.log(`Command not found: ${args[0] ? args[0] : args}`)
}

if(args[0] == '' || args == '') {
    console.log('Welcome to lingoJ!')
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

    default:
        break;
}
