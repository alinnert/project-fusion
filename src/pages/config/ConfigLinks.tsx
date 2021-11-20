import { LinkIcon } from '@heroicons/react/outline'
import { SaveIcon, TrashIcon } from '@heroicons/react/solid'
import React, { FC, FormEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../components/settings/useSettings'
import { Button } from '../../components/ui/Button'
import { Headline } from '../../components/ui/Headline'
import { Input } from '../../components/ui/Input'
import { PageContent } from '../../components/ui/PageContent'
import { useConfirmDialog } from '../../components/ui/useConfirmDialog'
import { useAppDispatch, useAppSelector } from '../../redux'
import { setPrimaryProjectLink } from '../../redux/settings'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const ConfigLinks: FC = () => {
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()

  const { databaseSettings } = useSettings()

  const primaryProjectLink = useAppSelector(
    (state) => state.settings.primaryProjectLink,
  )

  const [primaryProjectLinkLabel, setPrimaryProjectLinkLabel] = useState(
    primaryProjectLink?.label ?? '',
  )

  const [primaryProjectLinkUrl, setPrimaryProjectLinkUrl] = useState(
    primaryProjectLink?.url ?? '',
  )

  const {
    dialog: confirmDeletePrimaryProjectLinkDialog,
    openDialog: openConfirmDeletePrimaryProjectLinkDialog,
  } = useConfirmDialog({
    onConfirm() {
      dispatch(setPrimaryProjectLink(null))
      setPrimaryProjectLinkLabel('')
      setPrimaryProjectLinkUrl('')
    },
  })

  const primaryProjectLinkIsValid = useMemo(() => {
    const trimmedLabel = primaryProjectLinkLabel.trim()
    const trimmedUrl = primaryProjectLinkUrl.trim()

    const labelIsEmpty = trimmedLabel === ''
    const urlIsEmpty = trimmedUrl === ''

    // If values have not been changed
    if (primaryProjectLink !== null) {
      if (
        trimmedLabel === primaryProjectLink.label &&
        trimmedUrl === primaryProjectLink.url
      ) {
        return false
      }
    } else {
      if (trimmedLabel === '' && trimmedUrl === '') {
        return false
      }
    }

    // If values have been changed
    if (labelIsEmpty && urlIsEmpty) return true
    if (!labelIsEmpty && !urlIsEmpty) return true
    return false
  }, [primaryProjectLink, primaryProjectLinkLabel, primaryProjectLinkUrl])

  function handlePrimaryLinkSubmit(event: FormEvent): void {
    event.preventDefault()
    if (!primaryProjectLinkIsValid) return

    if (
      primaryProjectLinkLabel.trim() === '' &&
      primaryProjectLinkUrl.trim() === ''
    ) {
      dispatch(setPrimaryProjectLink(null))
    } else {
      dispatch(
        setPrimaryProjectLink({
          label: primaryProjectLinkLabel,
          url: primaryProjectLinkUrl,
        }),
      )
    }
  }

  function handlePrimaryLinkDelete(): void {
    if (primaryProjectLink === null) return
    openConfirmDeletePrimaryProjectLinkDialog({
      title: t('settings:links.projectLinks.primaryLink.deleteDialog.title'),
      message: t('settings:links.projectLinks.primaryLink.deleteDialog.body'),
      confirmButtonLabel: t('buttons.delete'),
      confirmButtonType: 'delete',
    })
  }

  return (
    <>
      {confirmDeletePrimaryProjectLinkDialog}

      <PageContent
        title={t('settings:links.title')}
        centered={true}
        titleIcon={<LinkIcon />}
        titleIconType="outline"
        titleIconColor={databaseSettings.links.iconColor}
      >
        <p>{t('settings:links.description')}</p>

        <Headline>{t('settings:links.projectLinks.title')}</Headline>

        <p>{t('settings:links.projectLinks.description')}</p>

        <form className="mt-4" onSubmit={handlePrimaryLinkSubmit}>
          <div className="grid grid-cols-[1fr,2fr] gap-x-2 mb-2">
            <Input
              value={primaryProjectLinkLabel}
              onChange={setPrimaryProjectLinkLabel}
              label={t('settings:links.projectLinks.primaryLink.labelLabel')}
            />
            <Input
              value={primaryProjectLinkUrl}
              onChange={setPrimaryProjectLinkUrl}
              label={t('settings:links.projectLinks.primaryLink.urlLabel')}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              type="primary"
              icon={<SaveIcon />}
              disabled={!primaryProjectLinkIsValid}
            >
              {t('buttons.save')}
            </Button>

            <Button
              type="delete"
              icon={<TrashIcon />}
              onClick={handlePrimaryLinkDelete}
              buttonProps={{ type: 'button' }}
            >
              {t('buttons.delete')}
            </Button>
          </div>
        </form>
      </PageContent>
    </>
  )
}