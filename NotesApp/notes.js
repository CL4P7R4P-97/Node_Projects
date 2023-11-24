const fs = require('fs');
const chalk = require('chalk');

const loadNotes = function(){

    try{
        chalk.blue("Fetching notes...");
        let notes = fs.readFileSync('notes.json');
        notes = notes.toString();
        return JSON.parse(notes);
    }
    catch(err){
        chalk.red.bold("Error Reading notes");
        return [];
    }

}

const getNotes = function(){

     let notes = loadNotes();
     return notes;
}

const addNote = function(title,body){

     
    console.log(chalk.yellow("Adding note...."));

     let notes = loadNotes();
     
     console.log("Notes present: ",notes);
     let note = {
        title: title,
        body: body
     }
     notes.push(note);
     
   try{
    fs.writeFileSync('notes.json', JSON.stringify(notes));
    console.log(chalk.green.bold('Note added'));
   }    
   catch(err){
      console.log(chalk.red.bold("Error adding note"));
   } 
}

const removeNote = function(title){

    let notes = loadNotes();
    
    notes = notes.filter((note)=>note.title != title);
   try{
    fs.writeFileSync('notes.json', JSON.stringify(notes));
    console.log(chalk.green.bold('Note removed'));
   }    
   catch(err){
      console.log(chalk.red.bold("Error removing note"));
   } 
}

const updateNote = function(title,body){

    let notes = loadNotes();
    notes = JSON.parse(notes).data;
    let noteIndex = notes.findIndex((note)=>note.title===title);
    if(noteIndex !== undefined){
        notes[noteIndex].title = title;
        notes[noteIndex].body = body;

        try{
            fs.appendFileSync('notes.json', JSON.parse(notes));
            console.log(chalk.green.bold('Note added'));
           }    
           catch(err){
              console.log(chalk.red.bold("Error adding note"));
           } 
    }
    else{
       console.log( chalk.yellow.bold('No note found to update !'));
    }

  
}

const getNote = function(title){

    let notes = loadNotes();
    
    let noteIndex = notes.findIndex((note)=>note.title===title);
     
    if(noteIndex !== -1){
       console.log( chalk.blue.bold('Note found'));
      
        return notes[noteIndex];
    }
    else{
        chalk.yellow.bold("No note found!");

    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    updateNote: updateNote,
    removeNote: removeNote,
    getNote: getNote
}