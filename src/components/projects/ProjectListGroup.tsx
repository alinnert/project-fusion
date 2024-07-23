import React, { FC, useState } from 'react'
import { Project } from '../../redux/projects'
import { Headline } from '../ui/Headline'
import { ProjectListItem } from './ProjectListItem'
import classNames from 'classnames'
import { Heroicon } from '../ui/Heroicon'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

interface Props {
  headline?: string
  projects: Array<Project>
}

export const ProjectListGroup: FC<Props> = ({ headline, projects }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (projects.length === 0) return null

  return (
    <div className="first:mt-2 not-first:mt-8">
      {headline !== undefined ? (
        <Headline center dimmed onClick={() => setIsOpen(!isOpen)}>
          <Heroicon icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} />
          {headline}
        </Headline>
      ) : null}

      <div
        className={classNames({ hidden: !isOpen && headline !== undefined })}
      >
        {projects.map((project) => (
          <ProjectListItem key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}
