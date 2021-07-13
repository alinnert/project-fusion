import Image from 'next/image'
import React, { ReactElement } from 'react'
import { Layout } from '../components/app/Layout'
import { PageContent } from '../components/ui/PageContent'
import LogoPicture from '../public/icon-128.png'

export default function Info(): ReactElement | null {
  return (
    <Layout>
      <PageContent title="Über ProjectFusion">
        <div className="prose prose-brand select-text">
          <Image src={LogoPicture} alt="ProjectFusion Logo" />

          <p>
            <i>
              Version 0.1
              if-you-use-this-in-production-kittens-will-die-pre-alpha
            </i>
          </p>

          <p>
            <strong>Verwendete Technologien:</strong>
          </p>

          <ul>
            <li>TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Redux Toolkit</li>
            <li>Tailwind CSS</li>
            <li>Heroicons</li>
            <li>classnames</li>
            <li>idb-keyval</li>
            <li>marked</li>
            <li>nanoid</li>
            <li>Native File System API</li>
          </ul>
        </div>
      </PageContent>
    </Layout>
  )
}
