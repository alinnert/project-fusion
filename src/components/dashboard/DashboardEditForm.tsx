import React, { FC, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { saveDashboardCommand } from '../../commands/dashboardCommands'
import { useCommand } from '../../commands/useCommand'
import { Dashboard } from '../../redux/dashboard'
import { Form } from '../ui/forms/Form'
import { Textarea } from '../ui/forms/Textarea'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/toolbar/ToolbarContainer'
import { useDashboardShortcuts } from './useDashboardShortcuts'
import { useDashboardToolbarItems } from './useDashboardToolbarItems'

type Props = {
  dashboard: Dashboard
}

export const DashboardEditForm: FC<Props> = ({ dashboard }) => {
  const { t } = useTranslation()

  const [notes, setNotes] = useState<string>(dashboard.notes)

  const saveDashboard = useCommand(saveDashboardCommand)

  const toolbarItems = useDashboardToolbarItems({
    saveDashboard() {
      saveDashboard.runAndNavigate({ notes })
    },
  })

  useDashboardShortcuts({
    saveDashboard() {
      saveDashboard.runAndNavigate({ notes })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    saveDashboard.runAndNavigate({ notes })
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
