#! /usr/bin/env node
import '@babel/polyfill';
import rp from 'request-promise';
import program from 'commander';
import ora from 'ora';
import checkLicense from './checkLicense';
import helpers from './helpers/helpers';

program
  .version('0.0.1')
  .option('-f, --file <path>', 'Specify package.json to read')
  .parse(process.argv);

const {license, devDependencies, dependencies} = helpers.readPackageJson(program.file);
checkLicense.registerProjectLicense(license);
const totalDepEntries = Object.entries(dependencies).concat(Object.entries(devDependencies));

async function evaluateCompatabiliy() {
  for (const entry of totalDepEntries) {
    const options = {
      uri: `https://registry.npmjs.org/${entry[0]}`
    };
    try {
      const spinner = ora('Checking License...').start();
      const res = await rp(options);
      const packageData = JSON.parse(res);
      const version = packageData['dist-tags'].latest;
      const versionInfo = packageData.versions[version];
      const isCompatible = checkLicense.checkLicenseAgainstDep(versionInfo.license);
      if (isCompatible) {
        spinner.succeed(`License for ${versionInfo.name} is compatible.`);
      } else {
        spinner.fail(`License for ${versionInfo.name} is incompatible.`);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
}

evaluateCompatabiliy();
