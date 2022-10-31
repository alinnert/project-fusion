import { Migration } from '../useMigrate'

export const v2: Migration = {
  version: 2,
  run(database) {
    // #37: Add possibility to add notes on the dashboard
    database.dashboard = { notes: '' }
  },
}
