module.exports = {
  plugins: [
    require('rollup-plugin-json')(),
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-node-resolve')({
      // Avoid https://github.com/rollup/rollup-plugin-node-resolve/issues/196
      preferBuiltins: true,
    }),
    require('rollup-plugin-terser').terser(),
  ],
};

if (process.env.BUILD === 'common') {
  module.exports.plugins.unshift(
    require('rollup-plugin-remap')({
      originalPath: './data/all.json',
      targetPath: './data/common.json',
    })
  );
}
