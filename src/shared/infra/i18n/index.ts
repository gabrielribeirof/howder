import path from 'path'
import i18n from 'i18next'
import Backend from 'i18next-fs-backend'

import { Logger } from '@shared/core/logger'

export class I18n {
  private logger = new Logger(I18n.name)

  public async init(): Promise<void> {
    try {
      await i18n
        .use(Backend)
        .init({
          lng: 'en',
          ns: ['violation_messages'],
          preload: ['en', 'pt-BR'],
          fallbackLng: 'en',
          backend: {
            loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json')
          }
        })

      this.logger.info('Internationalization initiate')
    } catch (error) {
      this.logger.emerg(error)
    }
  }
}
