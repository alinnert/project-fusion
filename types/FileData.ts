export interface PseudoGroup {
  id: string
  name: string
}

export interface ProjectGroup {
  id: string
  name: string
  color: string
  notes: string
  projects: Array<keyof FileData['projects']>
}

export interface Project {
  id: string
  name: string
  projectNumber: string
  important: boolean
  archived: boolean
  notes: string
}

export interface Settings {
  bookingUrl: string
}

export interface FileData {
  groups: Array<ProjectGroup>
  projects: Record<string, Project>
  settings: Settings
}
