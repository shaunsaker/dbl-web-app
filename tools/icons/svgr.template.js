function template(
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) {
  const newComponentName = {
    ...componentName,
    name: componentName.name.replace('Svg', ''),
  }
  return template.ast`
      ${imports}
      export const ${newComponentName} = (${props}) => ${jsx}
    `
}
module.exports = template
