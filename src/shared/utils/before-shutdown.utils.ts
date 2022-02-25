import { SignalConstants } from 'os'
import { Logger } from '@shared/core/logger'

type BeforeShutdownHandler = () => Promise<void>

const SHUTDOWN_SIGNALS: Array<keyof SignalConstants> = ['SIGINT', 'SIGTERM']
let beforeShutdownHandler: BeforeShutdownHandler

async function shutdownListener(signal: string): Promise<void> {
  const logger = new Logger('Shutdown Listener')
  logger.alert(`Shutting down: ${signal} signal received`)

  try {
    await beforeShutdownHandler()
  } catch (error) {
    logger.alert(`Handler failed before completing: ${error}`)
  }

  process.exit(0)
}

export function beforeShutdown(handler: BeforeShutdownHandler): void {
  beforeShutdownHandler = handler

  SHUTDOWN_SIGNALS.forEach(signal => process.once(signal, shutdownListener))
}
