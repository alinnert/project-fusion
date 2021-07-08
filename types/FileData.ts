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

export type ProjectStatus = 'important' | 'normal' | 'archived';

export interface Project {
  id: string
  name: string
  projectNumber: string
  status: ProjectStatus
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
