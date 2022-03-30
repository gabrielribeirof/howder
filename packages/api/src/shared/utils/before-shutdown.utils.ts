import { SignalConstants } from 'os'
import { Logger } from '@shared/core/logger'

type BeforeShutdownHandler = () => Promise<void>

const SHUTDOWN_SIGNALS: Array<keyof SignalConstants> = ['SIGINT', 'SIGTERM']

async function shutdownListener(signal: string, handler: BeforeShutdownHandler): Promise<void> {
  const logger = new Logger('Shutdown Listener')
  logger.alert(`Shutting down: ${signal} signal received`)

  try {
    await handler()

    process.exit(0)
  } catch (error) {
    logger.alert(`Handler failed before completing: ${error}`)
  }
}

export function beforeShutdown(handler: BeforeShutdownHandler): void {
  SHUTDOWN_SIGNALS.forEach(signal => process.once(signal, () => {
    shutdownListener(signal, handler)
  }))
}
