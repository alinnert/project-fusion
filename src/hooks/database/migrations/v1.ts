import { Migration } from '../useMigrate'

export const v1: Migration = {
  version: 1,
  run(database) {
    // #23: Make projects sortable
    database.settings.projectsSortOrder = {
      sortBy: 'name',
      sortOrder: 'ascending',
    }

    // #12: Enable "project number" to be renamed
    database.settings.projectIdWording = null
  },
}
