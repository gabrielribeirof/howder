import winston from 'winston'
import colors from 'colors'
import { format, addMinutes } from 'date-fns'

export interface IConfigParam {
  tag?: string
}

const consoleFormat = winston.format.printf(info => {
  const { timestamp, tag, level, message } = info

  const date = new Date(timestamp)
  const dateFormat = colors.black.bold(format(addMinutes(date, date.getTimezoneOffset()), 'MM-dd-yyyy HH:mm:ss'))

  return `${dateFormat} ${level} [${tag}]: ${message}`
})

export class Logger {
  static instance: winston.Logger
  static currentTag: string

  public static init(): void {
    Logger.instance = winston.createLogger({
      levels: winston.config.syslog.levels,
      format: winston.format.combine(
        winston.format.errors(),
        winston.format.timestamp(),
        winston.format(info => {
          info.tag = info.tag.toUpperCase()
          info.level = info.level.toUpperCase()

          return info
        })()
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize({ level: true }),
            consoleFormat
          )
        })
      ]
    })
  }

  public static setTag(value: string): void {
    Logger.currentTag = value
  }

  public static emerg(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.emerg(message, { tag: Logger.currentTag })

    process.exit()
  }

  public static alert(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.alert(message, { tag: Logger.currentTag })
  }

  public static crit(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.crit(message, { tag: Logger.currentTag })
  }

  public static error(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.error(message, { tag: Logger.currentTag })
  }

  public static warning(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.warning(message, { tag: Logger.currentTag })
  }

  public static notice(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.notice(message, { tag: Logger.currentTag })
  }

  public static info(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.info(message, { tag: Logger.currentTag })
  }

  public static debug(message: string, config?: IConfigParam): void {
    config?.tag && (Logger.currentTag = config.tag)

    Logger.instance.debug(message, { tag: Logger.currentTag })
  }
}
