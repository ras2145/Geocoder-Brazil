const  program =require( 'commander')
const { prompt } = require('inquirer')
const { 
  geocode  
} = require('./geo'); //main point of access for the app

const prompts = [
  {
    type : 'input',
    name : 'inputSchoolFile',
    message : 'Enter input path and file name (SCHOOLS) (file must be csv format. See Readme file)..'
  },
  {
    type : 'input',
    name : 'inputTeacherFile',
    message : 'Enter input path and file name (TEACHERS) (file must be csv format. See Readme file)..'
  },
  {
    type : 'input',
    name : 'outputSchoolFile',
    message : 'Enter output path and file name (SCHOOLS) ..'
  },
  {
    type : 'input',
    name : 'outputTeacherFile',
    message : 'Enter output path and file name (TEACHERS) ..'
  }


];

program
  .version('0.0.1')
  .description('Geocoder generic tool')

program
  .command('geocode file')
  .alias('gc')
  .description('geocode a file')
  .action(() => {
    prompt(prompts).then((answers) =>
      geocode(answers));
  });

  
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)