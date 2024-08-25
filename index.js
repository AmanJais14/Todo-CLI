const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const path = require('path');
let name = "todo";
// let count = 1;
program
  .name('Todo-CLI')
  .description('CLI to manage todo in filesystem')
  .version('0.8.0');

program.command('add')
  .description('Add task')
  .argument('<Time>', 'FInish Time')
  .argument('<Todo>', 'Todo to add')
  .action((Time,Todo ) => {
    const obj =  {
        title : Todo,
        deadline : Time
    }
    const fileName = `${name}.json`;
    // count++;
    const filePath = path.join(__dirname, fileName);
    
    fs.readFile(filePath, 'utf-8',(err,data) => {
        let jsonData = [];
        if (err) {
            if (err.code === 'ENOENT') {
                jsonData = [obj];
            } else {
                console.log(err);
                return;
            }
        }
        else {
            if (data) {
                jsonData = JSON.parse(data); 
            }
            jsonData.push(obj); 
        }
        fs.writeFile(filePath, JSON.stringify(jsonData,null,2),'utf-8', (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('success');
            }
        }) 
    })
    
  })

  program.command('delete')
  .description('Delete task')
  .argument('<Todo>', 'Todo to delete')
  .action((Todo ) => {
    const fileName = `${name}.json`;
    const filePath = path.join(__dirname, fileName);
    
    fs.readFile(filePath, 'utf-8',(err,data) => {
        let jsonData = [];
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist');
                return;
            } else {
                console.log(err);
                return;
            }
        }
        else {
            jsonData = JSON.parse(data); 
            let length = jsonData.length;
            jsonData = jsonData.filter(obj => obj.title !== Todo )
            if (jsonData.length === length) {
                console.log('No matching Todo found to delete.');
                return;
            }
        }
        fs.writeFile(filePath, JSON.stringify(jsonData,null,2),'utf-8', (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('success');
            }
        }) 
        
    })
    
  })
  program.command('mark')
  .description('Mark todo as done')
  .argument('<Todo>', 'Todo to update')
  .action((Todo ) => {
    const fileName = `${name}.json`;
    const filePath = path.join(__dirname, fileName);
    
    fs.readFile(filePath, 'utf-8',(err,data) => {
        let jsonData = [];
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist');
                return;
            } else {
                console.log(err);
                return;
            }
        }
        else {
            jsonData = JSON.parse(data); 
            let length = jsonData.length;
            let taskFound = false;
            jsonData = jsonData.map(obj => {
                if(obj.title === Todo) {
                    obj.done = true;
                    taskFound = true;
                }
                return obj
            })
            if (!taskFound) {
                console.log('Todo not found.');
                return;
              }
            
        }
        fs.writeFile(filePath, JSON.stringify(jsonData,null,2),'utf-8', (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('success');
            }
        }) 
        
    })
    
  })

  

program.parse();