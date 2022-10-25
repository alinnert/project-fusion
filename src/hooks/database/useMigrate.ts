import { useCallback } from 'react'
import { useAppSelector } from '../../redux'
import { Database } from '../../redux/database'
import { writeStateToFile } from '../../redux/middleware/saveDatabase/writeStateToFile'
import { v1 } from './migrations/v1'

const migrations = [v1]

export type Migration = { version: number; run: (database: Database) => void }

type UseMigrateResult = (database: Database) => void

export function useMigrate(): UseMigrateResult {
  const state = useAppSelector((state) => state)

  return useCallback(
    (database: Database) => {
      const currentDatabaseVersion = database.version ?? 0

      for (const migration of migrations) {
        if (migration.version <= currentDatabaseVersion) continue
        migration.run(database)
        database.version = migration.version
        writeStateToFile(state)
      }
    },
    [state],
  )
}
