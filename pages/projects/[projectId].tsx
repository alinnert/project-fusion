import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export default function ProjectById(): ReactElement {
  const router = useRouter()
  const { projectId } = router.query

  return <div>{ projectId }</div>
}