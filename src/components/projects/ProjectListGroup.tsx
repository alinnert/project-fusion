import React, { FC } from 'react'
import { Project } from '../../redux/projects'
import { Headline } from '../ui/Headline'
import { ProjectListItem } from './ProjectListItem'

interface Props {
  headline: string
  projects: Array<Project>
}

export const ProjectListGroup: FC<Props> = ({ headline, projects }) => {
  if (projects.length === 0) return null

  return (
    <div className="mt-8">
      <Headline center dimmed>
        {headline}
      </Headline>

      {projects.map((project) => (
        <ProjectListItem key={project.id} {...project} />
      ))}
    </div>
  )
}
