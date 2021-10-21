#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const readmeTemplate = fs.readFileSync(path.join(__dirname, '../readme-template.md'), 'utf-8');

const program = new Command();
program.version('0.1.0');

program
  .command('create')
  .description('Generates a README.md for a Node.js project')
  .action(() => {
    const template = Handlebars.compile(readmeTemplate);

    const cwd = path.parse(process.cwd()).name;

    const readme = template({
      title: cwd,
    });

    fs.writeFileSync(path.join(process.cwd(), './README.md'), readme);
  });

program.parse();
