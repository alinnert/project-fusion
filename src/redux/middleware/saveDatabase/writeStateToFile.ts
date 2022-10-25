import { Dictionary } from '@reduxjs/toolkit'
import { AppState } from '../..'
import { asyncTry } from '../../../utils/tryCatch'
import { Category } from '../../categories'
import { ProjectGroup } from '../../groups'
import { Project } from '../../projects'
import { Settings } from '../../settings'
import { getCurrentFile } from './currentFile'

let lastContentString = ''

export function resetLastFileContent(): void {
  lastContentString = ''
}

export type DatabaseFileContent = {
  version?: number
  categories: Dictionary<Category>
  groups: Dictionary<ProjectGroup>
  projects: Dictionary<Project>
  settings: Settings
}

export async function writeStateToFile(state: AppState): Promise<void> {
  const content: DatabaseFileContent = {
    version: state.database.version,
    categories: state.categories.entities,
    groups: state.groups.entities,
    projects: state.projects.entities,
    settings: state.settings,
  }

  const contentString = JSON.stringify(content)
  if (contentString === lastContentString) return

  const fileHandle = getCurrentFile()
  if (fileHandle === null) {
    console.error('There is no file handle in the database')
    return
  }

  const writableResult = await asyncTry(() => fileHandle.createWritable())
  if (writableResult.caught) {
    console.error(writableResult.error)
    return
  }

  const { value: writable } = writableResult

  const writeResult = await asyncTry(() => writable.write(contentString))
  if (writeResult.caught) {
    console.error(writeResult.error)
  }

  const closeResult = await asyncTry(() => writable.close())
  if (closeResult.caught) {
    console.error(closeResult.error)
  }

  lastContentString = contentString
}
