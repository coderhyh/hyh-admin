import { defineConfig, presetAttributify, presetIcons, presetUno, Rule } from 'unocss'
// https://github.com/unocss/unocss

const sizeMapping: Record<string, string> = {
  h: 'height',
  w: 'width',
  m: 'margin',
  p: 'padding',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  fs: 'font-size',
  br: 'border-radius'
}

function getSizeRules(Mapping: Record<string, string>): Rule<{}>[] {
  return Object.keys(Mapping).map((key) => {
    const value = Mapping[key]
    return [new RegExp(`^${key}(\\d+)$`), ([, d]) => ({ [value]: `${d}px` })]
  })
}

export const createConfig = () => {
  return defineConfig({
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        prefix: '',
        autoInstall: true
      })
    ],
    include: [/\.vue$/, /pages.json?$/],
    rules: getSizeRules(sizeMapping)
  })
}

export default createConfig()
