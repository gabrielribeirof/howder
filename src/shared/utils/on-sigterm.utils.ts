export function onSigterm(...subscribers: (() => void)[]): void {
  process.on('SIGTERM', () => {
    for (const subscriber of subscribers) subscriber()

    process.exit()
  })
}
