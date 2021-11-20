import React, { FC } from 'react'
import { ProjectEditForm } from '../../components/projects/ProjectEditForm'
import { useProjectFromRoute } from '../../components/projects/useProjectFromRoute'

export const EditProject: FC = () => {
  const { project } = useProjectFromRoute()

  return <ProjectEditForm init={project} />
}
