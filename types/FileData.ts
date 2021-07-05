export interface ProjectGroup {
  id: string
  name: string
  color?: string
}

export interface Project {
  id: string
  name: string
  projectNumber: string
  status: 'important' | 'normal' | 'archived'
}

export interface Settings {
  bookingUrl: string
}

export interface FileData {
  groups: ProjectGroup[]
  projects: Project[]
  settings: Settings
}
