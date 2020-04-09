const cldr = require('cldr');
const promisify = require('util').promisify;
const writeFileAsync = promisify(require('fs').writeFile);
const mkdirp = require('mkdirp');
const pathModule = require('path');
const commonLocaleIds = new Set(require('./commonLocaleIds.json'));
const outputDir = pathModule.resolve(__dirname, 'data');

(async () => {
  try {
    const data = {
      common: {},
      all: {}
    };
    for (const localeId of cldr.localeIds) {
      const andPatterns = cldr.extractListPatterns(localeId).default;
      data.all[localeId] = andPatterns;

      if (commonLocaleIds.has(localeId)) {
        data.common[localeId] = andPatterns;
      }
    }

    await mkdirp(outputDir);

    for (const bucketName of Object.keys(data)) {
      await writeFileAsync(
        pathModule.resolve(outputDir, `${bucketName}.json`),
        JSON.stringify(data[bucketName]) + '\n'
      );
      const andData = {};
      for (const localeId of Object.keys(data[bucketName])) {
        andData[localeId] = data[bucketName][localeId].default;
      }
    }
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
})();
