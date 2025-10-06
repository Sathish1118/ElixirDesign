const SDpkg = require('style-dictionary');
const StyleDictionary = (SDpkg && SDpkg.registerTransform) ? SDpkg : (SDpkg && SDpkg.default ? SDpkg.default : SDpkg);
const path = require('path');
const BASE_PX = 16;
StyleDictionary.registerTransform({
  name: 'pxToRem',
  type: 'value',
  filter: function (prop) {
    if (!prop || prop.value === undefined || prop.value === null) return false;
    if (typeof prop.value === 'number') return true;
    if (typeof prop.value === 'string') {
      return /^-?\d+(\.\d+)?px$/.test(prop.value.trim()) || /^-?\d+(\.\d+)?$/.test(prop.value.trim());
    }
    return false;
  },
  transform: function (prop) {
    const v = prop.value;
    if (typeof v === 'number') {
      if (v === 0) return '0';
      return `${v / BASE_PX}rem`;
    }
    if (typeof v === 'string') {
      const s = v.trim();
      const m = s.match(/^(-?\d+(?:\.\d+)?)(px)?$/);
      if (m) {
        const num = parseFloat(m[1]);
        if (num === 0) return '0';
        return `${num / BASE_PX}rem`;
      }
    }
    return v;
  }
});
const configPath = path.join(__dirname, 'config.json');

(async function () {
  try {
    const sdInstance = new StyleDictionary(configPath);
    console.log('Building design tokens with px -> rem transform (base', BASE_PX, 'px)');
    await sdInstance.buildAllPlatforms();
    console.log('Build complete.');
  } catch (err) {
    console.error('Style Dictionary build failed:');
    console.error(err);
    process.exitCode = 1;
  }
})();
