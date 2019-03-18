/**
 * Asynchronously load messages from translation files
 * @param  {VueI18n}  i18n  vue-i18n instance
 * @param  {String}   lang  Language code to load
 * @return {Promise}
 */
export async function loadLanguageAsync (i18n, locale) {
  const LOCALE_CODE_KEY = 'code'
  const LOCALE_FILE_KEY = 'file'

  if (!i18n.loadedLanguages) {
    i18n.loadedLanguages = []
  }
  if (!i18n.loadedLanguages.includes(locale)) {
    const langOptions = i18n.locales.find(l => l[LOCALE_CODE_KEY] === locale)
    if (langOptions) {
      const file = langOptions[LOCALE_FILE_KEY]
      if (file) {
        try {
          const module = await import(/* webpackChunkName: "lang-[request]" */ '~/i18n/' + file)
          const messages = module.default ? module.default : module
          const result = typeof messages === 'function' ? await Promise.resolve(messages()) : messages
          i18n.setLocaleMessage(locale, result)
          i18n.loadedLanguages.push(locale)
          return result
        } catch (error) {
          console.error(error)
        }
      } else {
        console.warn('[nuxt-i18n] Could not find lang file for locale ' + locale)
      }
    }
  }
  return Promise.resolve()
}
