import fs from 'fs';
import licenseDefinitions from '../definitions/licenseCat.json';

const loadLicenseDefinition = (license) => {
  license = licenseDefinitions.licenses.find((licenseDef) => {
    return licenseDef.name === license;
  });
  return license;
};

const readPackageJson = (file = 'package.json') => {
  const data = fs.readFileSync(file);
  return JSON.parse(data.toString('utf-8'));
};

export default {loadLicenseDefinition, readPackageJson};