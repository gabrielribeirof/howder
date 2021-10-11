import path from 'path'
import i18n from 'i18next'
import Backend from 'i18next-fs-backend'

import { Logger } from '@shared/core/logger'

export class I18n {
  public static async init(): Promise<void> {
    Logger.setTag(this.name)

    try {
      await i18n
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

      Logger.info('Internationalization initiate')
    } catch (error) {
      Logger.emerg(error)
    }
  }
}
