import { promises as fs } from 'fs'
import { resolve } from 'path'
import { HmrContext } from 'vite'

type Options = Partial<{
  storeDir: string
  excludes: string[]
  outputFile: string
  pathAlias: string
}>

const defaultOptions: Options = {
  storeDir: 'src/store/src',
  excludes: ['index'],
  outputFile: 'src/hooks/useStore.ts',
  pathAlias: '~'
}

export default function (options: Options = {}) {
  options = { ...defaultOptions, ...options }

  const { storeDir, excludes, outputFile, pathAlias } = options as Required<Options>
  const storePath = resolve(process.cwd(), storeDir)
  const outputDir = outputFile.replace(/(\/[^/]*).ts/, '')
  fs.readdir(outputDir).catch(() => fs.mkdir(outputDir))

  async function generateConfigFiles() {
    const storesPath = await fs.readdir(storePath)
    const storeNames = storesPath
      .filter((i) => i.endsWith('.ts'))
      .map((i) => i.replace('.ts', ''))
      .filter((i) => !excludes.includes(i))

    const toHump = (s: string) => s.replace(/[-_]([A-z\d])/g, (_, $1) => $1.toUpperCase())
    const ctx = `import type { ToRef } from 'vue'

${storeNames.reduce(
  (str, storeName) => `${str}import ${toHump(storeName)}Store from '${storeDir.replace('src', pathAlias)}/${storeName}'
`,
  ''
)}
type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
}

const storeExports = {
${storeNames.reduce(
  (str, storeName, i) => `${str}  ${toHump(storeName)}: ${toHump(storeName)}Store${
    i === storeNames.length - 1 ? '' : ','
  }
`,
  ''
)}}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<typeof storeExports[T]>>
}
`
    fs.writeFile(outputFile, ctx, 'utf-8')
  }

  generateConfigFiles()
  return {
    name: 'pinia-auto-refs',
    handleHotUpdate(ctx: HmrContext) {
      if (ctx.file.includes(storeDir)) {
        generateConfigFiles()
      }
    }
  }
}
