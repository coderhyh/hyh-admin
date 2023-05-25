export const defaultTab: App.ITab = { title: '控制台', path: '/' }

export default defineStore(
  'layout',
  () => {
    const isCollapse = ref(false)
    const tabs = ref([defaultTab])
    const winSize = ref(window.innerWidth)
    const theme = ref<'dark' | 'light'>('light')

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      setBodyTheme()
    }
    const setBodyTheme = () => {
      document.body.setAttribute('theme-mode', theme.value)
    }

    const resize = () => (winSize.value = window.innerWidth)
    window.addEventListener('resize', resize)

    const addTab = (tab: App.ITab = defaultTab) => {
      if (tabs.value.some((t) => t.path === tab.path)) return
      tabs.value.push(tab)
    }
    const removeTab = (path: string) => {
      tabs.value = tabs.value.filter((t) => t.path !== path)
      if (tabs.value.length === 0) addTab()
    }
    const removeOtherTab = (path: string) => {
      tabs.value = tabs.value.filter((t) => t.path === path)
    }
    const removeRightTab = (path: string) => {
      const index = tabs.value.findIndex((i) => i.path === path)
      tabs.value = tabs.value.slice(0, index + 1)
    }
    const removeAllTab = () => {
      tabs.value = [defaultTab]
    }
    return {
      isCollapse,
      tabs,
      winSize,
      theme,
      toggleTheme,
      setBodyTheme,
      addTab,
      removeTab,
      removeOtherTab,
      removeRightTab,
      removeAllTab
    }
  },
  { persist: { paths: ['tabs', 'theme'] } }
)
