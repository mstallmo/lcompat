#! /usr/bin/env node
import fs from 'fs';

const [,, ...args] = process.argv;
args.forEach((element) => {
  console.log(element);
});

fs.readFile('package.json', (err, data) => {
  if (err) throw err;
  const {license, devDependencies} = JSON.parse(data.toString('utf-8'));
  console.log(license);
  console.log(devDependencies);
});