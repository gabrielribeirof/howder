import i18n from 'i18next'
import path from 'path'
import Backend from 'i18next-fs-backend'

import { Logger } from '@shared/core/logger'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class I18n {
  private logger = new Logger(I18n.name)
  private languages = ['en', 'pt-BR']
  private namespaces = ['violation_messages']

  public async init(): Promise<void> {
    await i18n
      .use(Backend)
      .init({
        lng: 'en',
        ns: this.namespaces,
        preload: this.languages,
        fallbackLng: 'en',
        backend: {
          loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json')
        }
      })

    this.healthCheck()

    this.logger.info('Internationalization initiate')
  }

  private healthCheck(): void {
    const violationIdentifier = Object.keys(ViolationReasons)

    this.languages.forEach(lng => {
      this.namespaces.forEach(ns => {
        const resources = Object.keys(i18n.getResourceBundle(lng, ns))

        violationIdentifier.forEach(identifier => {
          if (!resources.find(value => value === identifier)) {
            throw new Error(`Missing translation for violation_messages:${identifier} on ${lng} language`)
          }
        })
      })
    })
  }
}
