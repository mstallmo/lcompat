import checkLicense from './checkLicense.js';

describe('checkLicense permissive', () => {
  beforeAll(() => {
    checkLicense.registerProjectLicense('MIT');
  });

  it('should return true for the same license', () => {
    const isCompatible = checkLicense.checkLicenseAgainstDep('MIT');
    expect(isCompatible).toEqual(true);
  });

  it('should return true for the same family', () => {
    const isCompatible = checkLicense.checkLicenseAgainstDep('ISC');
    expect(isCompatible).toEqual(true);
  });

  it('should return true for weak copy left licenses', () => {
    const isCompatible = checkLicense.checkLicenseAgainstDep('LGPLv2.1+');
    expect(isCompatible).toEqual(true);
  });

  it('should return false for strong copy left licenses', () => {
    const isCompatible = checkLicense.checkLicenseAgainstDep('GPLv2');
    expect(isCompatible).toEqual(false);
  });

  it('should return false for network copy left licenses', () => {
    const isCompatible = checkLicense.checkLicenseAgainstDep('Affero GPLv3');
    expect(isCompatible).toEqual(false);
  });
});