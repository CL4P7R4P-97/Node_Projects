const yargs = require('yargs');
const fs = require('fs');
const chalk  = require('chalk');
const note = require('./notes.js');


//Add
//demandOption will make title to be must in add command
//type will make sure that title type is string below
yargs.command({

    command: 'add',
    describe: 'Add a note',
    builder: {
          
        title: {
            describe: 'Title for the note',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body for the note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv){
        
        note.addNote(argv.title, argv.body);
    }
});

//Remove
yargs.command({

    command: 'remove',
    describe: 'Remove a note',
    builder: {
          
        title: {
            describe: 'Title for the note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv){
        note.removeNote(argv.title);
    }
});

//List
yargs.command({

    command: 'list',
    describe: 'List a note',
    handler: function(argv){
        console.log(note.getNotes());
    }
});

//Read
yargs.command({

    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log(note.getNote(argv.title)||chalk.red.bold("No match"));
    }
});


 
 yargs.parse();