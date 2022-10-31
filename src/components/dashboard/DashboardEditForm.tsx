import { HomeIcon } from '@heroicons/react/20/solid'
import React, { FC, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dashboard } from '../../redux/dashboard'
import { Form } from '../ui/forms/Form'
import { Textarea } from '../ui/forms/Textarea'
import { Heroicon } from '../ui/Heroicon'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/toolbar/ToolbarContainer'
import { useDashboardActions } from './useDashboardActions'
import { useDashboardShortcuts } from './useDashboardShortcuts'
import { useDashboardToolbarItems } from './useDashboardToolbarItems'

type Props = {
  dashboard: Dashboard
}

export const DashboardEditForm: FC<Props> = ({ dashboard }) => {
  const { t } = useTranslation()

  const [notes, setNotes] = useState<string>(dashboard.notes)
  const { saveDashboard } = useDashboardActions({ notes })
  const toolbarItems = useDashboardToolbarItems({ saveDashboard })

  useDashboardShortcuts({ saveDashboard })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    saveDashboard()
  }

  return (
    <ToolbarContainer
      title="Dashboard"
      toolbarItems={toolbarItems}
      toolbarPadding="lg"
    >
      <PageContent centered>
        <Form type="page" onSubmit={handleSubmit} submitOnCtrlEnter>
          <Textarea
            label={t('dashboard:labels.notes')}
            value={notes}
            onChange={setNotes}
          />
        </Form>
      </PageContent>
    </ToolbarContainer>
  )
}
