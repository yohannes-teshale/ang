const fs = require('fs');
const postcss = require('postcss');

const cssFilePath = process.argv[2];
const selectorsFilePath = process.argv[3];

let output = ''; 

fs.readFile(cssFilePath, (err, css) => {
  if (err) throw err;

  const selectors = fs.readFileSync(selectorsFilePath, 'utf8').split('\n').filter(Boolean); // Read and filter selectors

  
  postcss()
    .process(css, { from: cssFilePath })
    .then(result => {
      const root = result.root;
      selectors.forEach(selector => {
        
        root.walkRules(selector, rule => {
            
          output += rule.toString() + "\n"; 
        });
      });
      fs.writeFile('output.css', output, (err) => {
        if (err) throw err;
        console.log('The matched rules have been saved to output.css!');
      });
    });
});
