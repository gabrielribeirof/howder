import winston from 'winston'
import colors from 'colors'
import { format, addMinutes } from 'date-fns'

const consoleFormat = winston.format.printf(info => {
  const { timestamp, tag, level, message } = info

  const date = new Date(timestamp)
  const dateFormat = colors.black.bold(format(addMinutes(date, date.getTimezoneOffset()), 'MM-dd-yyyy HH:mm:ss'))

  return `${dateFormat} ${level} [${tag}]: ${message}`
})

export class Logger {
  public instance: winston.Logger

  constructor(public tag: string) {
    const transports: winston.transport[] = []

    process.env.NODE_ENV === 'production' && transports.push(new winston.transports.File({
      level: 'debug',
      dirname: 'logs',
      filename: 'howder.log',
      format: winston.format.combine(
        winston.format.json()
      )
    }))

    transports.push(new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format(info => {
          info.tag = this.tag
          info.level = info.level.toUpperCase()

          return info
        })(),
        winston.format.colorize({ level: true }),
        consoleFormat
      )
    }))

    this.instance = winston.createLogger({
      levels: winston.config.syslog.levels,
      format: winston.format.combine(
        winston.format.errors(),
        winston.format.timestamp()
      ),
      transports
    })
  }

  public setTag(value: string): void {
    this.tag = value
  }

  public emerg(message: any): void {
    this.instance.emerg(message)

    process.exit()
  }

  public alert(message: string): void {
    this.instance.alert(message)
  }

  public crit(message: string): void {
    this.instance.crit(message)
  }

  public error(message: string): void {
    this.instance.error(message)
  }

  public warning(message: string): void {
    this.instance.warning(message)
  }

  public notice(message: string): void {
    this.instance.notice(message)
  }

  public info(message: string): void {
    this.instance.info(message)
  }

  public debug(message: string): void {
    this.instance.debug(message)
  }
}

new Logger('Logger').info('oi')
