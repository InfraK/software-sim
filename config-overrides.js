/* eslint-disable @typescript-eslint/no-var-requires */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const { getThemeVariables } = require('antd/dist/theme');
const { colors } = require('./src/constants/colors');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...getThemeVariables({
        dark: true,
      }),
      '@primary-color': colors.primaryColor, // primary color for all components
      '@link-color': colors.linkColor, // link color
      '@success-color': colors.successColor, // success state color
      '@warning-color': colors.warningColor, // warning state color
      '@error-color': colors.errorColor, // error state color
      '@font-size-base': '14px', // major text font size
      '@border-radius-base': '4px', // major border radius
    },
  })
);
