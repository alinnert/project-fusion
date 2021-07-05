import { ReactElement } from 'react'
import { GroupList } from '../../components/groups/GroupList'
import { Layout } from '../../components/ui/Layout'

export default function GroupById(): ReactElement {
  return <Layout left={<GroupList />}></Layout>
}
