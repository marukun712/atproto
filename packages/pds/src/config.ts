export interface ServerConfigValues {
  debugMode?: boolean

  publicUrl?: string
  scheme: string
  port: number
  hostname: string

  dbPostgresUrl?: string
  dbPostgresSchema?: string

  jwtSecret: string

  didPlcUrl: string

  recoveryKey: string
  adminPassword: string

  inviteRequired: boolean

  blockstoreLocation?: string
  databaseLocation?: string

  testNameRegistry?: Record<string, string>

  appUrlPasswordReset: string
  emailSmtpUrl?: string
  emailNoReplyAddress: string
}

export class ServerConfig {
  constructor(private cfg: ServerConfigValues) {}

  static readEnv(overrides?: Partial<ServerConfig>) {
    const debugMode = process.env.DEBUG_MODE === '1'

    const publicUrl = process.env.PUBLIC_URL || undefined
    const hostname = process.env.HOSTNAME || 'localhost'
    let scheme
    if ('TLS' in process.env) {
      scheme = process.env.TLS === '1' ? 'https' : 'http'
    } else {
      scheme = hostname === 'localhost' ? 'http' : 'https'
    }
    const envPort = parseInt(process.env.PORT || '')
    const port = isNaN(envPort) ? 2583 : envPort

    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret'

    const didPlcUrl = process.env.DID_PLC_URL || 'http://localhost:2582'

    const recoveryKey = overrides?.recoveryKey || process.env.RECOVERY_KEY
    if (typeof recoveryKey !== 'string') {
      throw new Error('No value provided for process.env.RECOVERY_KEY')
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'

    const inviteRequired = process.env.INVITE_REQUIRED === 'true' ? true : false

    const blockstoreLocation = process.env.BLOCKSTORE_LOC
    const databaseLocation = process.env.DATABASE_LOC

    const testNameRegistry = debugMode ? {} : undefined

    const appUrlPasswordReset =
      process.env.APP_URL_PASSWORD_RESET || 'app://password-reset'

    const emailSmtpUrl = process.env.EMAIL_SMTP_URL || undefined

    const emailNoReplyAddress =
      process.env.EMAIL_NO_REPLY_ADDRESS || 'noreply@blueskyweb.xyz'

    const dbPostgresUrl = process.env.DB_POSTGRES_URL
    const dbPostgresSchema = process.env.DB_POSTGRES_SCHEMA

    return new ServerConfig({
      debugMode,
      publicUrl,
      scheme,
      hostname,
      port,
      dbPostgresUrl,
      dbPostgresSchema,
      jwtSecret,
      recoveryKey,
      didPlcUrl,
      adminPassword,
      inviteRequired,
      blockstoreLocation,
      databaseLocation,
      testNameRegistry,
      appUrlPasswordReset,
      emailSmtpUrl,
      emailNoReplyAddress,
      ...overrides,
    })
  }

  get debugMode() {
    return this.cfg.debugMode
  }

  get scheme() {
    return this.cfg.scheme
  }

  get port() {
    return this.cfg.port
  }

  get hostname() {
    return this.cfg.hostname
  }

  get origin() {
    const u = new URL(`${this.scheme}://${this.hostname}:${this.port}`)
    return u.origin
  }

  get publicUrl() {
    return this.cfg.publicUrl || this.origin
  }

  get dbPostgresUrl() {
    return this.cfg.dbPostgresUrl
  }

  get dbPostgresSchema() {
    return this.cfg.dbPostgresSchema
  }

  get jwtSecret() {
    return this.cfg.jwtSecret
  }

  get didPlcUrl() {
    return this.cfg.didPlcUrl
  }

  get recoveryKey() {
    return this.cfg.recoveryKey
  }

  get adminPassword() {
    return this.cfg.adminPassword
  }

  get inviteRequired() {
    return this.cfg.inviteRequired
  }

  get blockstoreLocation() {
    return this.cfg.blockstoreLocation
  }

  get useMemoryBlockstore() {
    return !this.blockstoreLocation
  }

  get databaseLocation() {
    return this.cfg.databaseLocation
  }

  get useMemoryDatabase() {
    return !this.databaseLocation
  }

  get testNameRegistry() {
    return this.cfg.testNameRegistry
  }

  get appUrlPasswordReset() {
    return this.cfg.appUrlPasswordReset
  }

  get emailSmtpUrl() {
    return this.cfg.emailSmtpUrl
  }

  get emailNoReplyAddress() {
    return this.cfg.emailNoReplyAddress
  }
}
