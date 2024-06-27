const { Command } = require('commander');
const program = new Command();

program
    .name('Calculator')
    .description('A simple CLI calculator')
    .version('1.0.0');

// Helper function to parse numbers
function parseNumbers(numbers, isFloat) {
    return numbers.map(num => isFloat ? parseFloat(num) : parseInt(num, 10));
}

// Addition command
program
    .command('add')
    .description('Add multiple numbers')
    .argument('<numbers...>', 'Numbers to add')
    .option('-f, --float', 'Add floating numbers')
    .option('--even', 'Add only even numbers')
    .option('--odd', 'Add only odd numbers')
    .action((numbers, options) => {
        let nums = parseNumbers(numbers, options.float);

        if (options.even) {
            nums = nums.filter(num => num % 2 === 0);
        } else if (options.odd) {
            nums = nums.filter(num => num % 2 !== 0);
        }

        const result = nums.reduce((acc, num) => acc + num, 0);
        console.log(`Result: ${result}`);
    });

// Subtract command
program
    .command('subtract')
    .description('Subtract multiple numbers')
    .argument('<numbers...>', 'Numbers to subtract')
    .action((numbers) => {
        const nums = numbers.map(num => parseFloat(num));
        const result = nums.reduce((acc, num) => acc - num);
        console.log(`Result: ${result}`);
    });

// Multiply command
program
    .command('multiply')
    .description('Multiply multiple numbers')
    .argument('<numbers...>', 'Numbers to multiply')
    .action((numbers) => {
        const nums = numbers.map(num => parseFloat(num));
        const result = nums.reduce((acc, num) => acc * num);
        console.log(`Result: ${result}`);
    });

// Divide command
program
    .command('divide')
    .description('Divide multiple numbers')
    .argument('<numbers...>', 'Numbers to divide')
    .action((numbers) => {
        const nums = numbers.map(num => parseFloat(num));
        const result = nums.reduce((acc, num) => acc / num);
        console.log(`Result: ${result}`);
    });

// Power command
program
    .command('power')
    .description('Calculate the power of a number')
    .argument('<base>', 'Base number')
    .argument('<exponent>', 'Exponent number')
    .action((base, exponent) => {
        const result = Math.pow(parseFloat(base), parseFloat(exponent));
        console.log(`Result: ${result}`);
    });

// Square root command
program
    .command('sqrt')
    .description('Calculate the square root of a number')
    .argument('<number>', 'Number to find the square root of')
    .action((number) => {
        const result = Math.sqrt(parseFloat(number));
        console.log(`Result: ${result}`);
    });

// Help command
program.on('--help', () => {
    console.log('\nExample usage:');
    console.log('node index.js add 1 2 3');
    console.log('node index.js add -f 1.1 2.2 3.3');
    console.log('node index.js add --even 1 2 3 4 5');
    console.log('node index.js subtract 10 5 1');
    console.log('node index.js multiply 2 3 4');
    console.log('node index.js divide 20 4 2');
    console.log('node index.js power 2 3');
    console.log('node index.js sqrt 16');
});

program.parse(process.argv);