/* eslint-disable @typescript-eslint/no-var-requires */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const { getThemeVariables } = require('antd/dist/theme');

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
      '@primary-color': '#1890ff', // primary color for all components
      '@link-color': '#1890ff', // link color
      '@success-color': '#52c41a', // success state color
      '@warning-color': '#faad14', // warning state color
      '@error-color': '#f5222d', // error state color
      '@font-size-base': '14px', // major text font size
      '@border-radius-base': '4px', // major border radius
    },
  })
);
