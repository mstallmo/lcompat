import helpers from './helpers/helpers';

let projectLicense;

const registerProjectLicense = (license) => {
  license = helpers.loadLicenseDefinition(license);
  projectLicense = license;
};

const checkLicenseAgainstDep = (depLicense) => {
  depLicense = helpers.loadLicenseDefinition(depLicense);
  return depLicense.worksWith.includes(projectLicense.type);
};

export default {registerProjectLicense, checkLicenseAgainstDep};
