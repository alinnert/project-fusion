import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProjectEditForm } from '../../components/projects/ProjectEditForm'
import { useAppSelector } from '../../redux'
import { ProjectTemplate } from '../../redux/projects'

export const CreateProject: FC = () => {
  const [searchParams] = useSearchParams()
  const from = useMemo(() => searchParams.get('common:from'), [searchParams])

  const projectTemplate = useAppSelector((state): ProjectTemplate | null => {
    if (from === null) return null
    const project = (state.projects.entities[from] as ProjectTemplate) ?? null
    if (project === null) return null
    const template = { ...project }
    Reflect.deleteProperty(template, 'id')
    return template
  })

  return <ProjectEditForm init={projectTemplate} />
}
