import path from 'path'
import i18n from 'i18next'
import Backend from 'i18next-fs-backend'

i18n
  .use(Backend)
  .init({
    lng: 'en',
    ns: ['codes'],
    preload: ['en', 'pt-BR'],
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json')
    }
  })
