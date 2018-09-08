let projectLicense;

const registerProjectLicense = (license) => {
  projectLicense = license;
};

const checkLicenseAgainstDep = (depLicense) => {
  if (depLicense === projectLicense) {
    return true;
  }

  return false;
};

export default {registerProjectLicense, checkLicenseAgainstDep};
