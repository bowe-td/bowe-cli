#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const git = require('./application/git-clonner');
const package = require('./package.json');

const repositoryChooser = (technology) => {
    const react = 'https://github.com/bowe-td/react-web-example'
    const reactNative = 'https://github.com/bowe-td/react-native-example'
    const nodejs = 'https://github.com/bowe-td/node-ts-example'

    switch (technology) {
        case 'ReactJS':
            return react;
        case 'NodeJS':
            return nodejs;
        case 'React Native':
            return reactNative;
        default:
            return react;
    }
}

program.version(package.version);

program
    .command('create [folder]')
    .description('Cria uma pasta com o scaffold de um projeto')
    .action((folder) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'technology',
                    message: 'Qual tecnologia vai utilizar?',
                    choices: ['ReactJS', 'NodeJS', 'React Native']
                }
            ]).then(({ technology }) => {
                const repo = repositoryChooser(technology)
                git(repo, folder);
            }).catch((e) => {
                console.error(chalk.red(e.message))
            }).finally(() => {
                console.log(chalk.green('Done!'))
            })
    });

program.parse(process.argv);