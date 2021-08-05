import { SaveIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { FormEvent, ReactElement, useMemo, useState } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { Button } from '../../components/ui/Button'
import { Headline } from '../../components/ui/Headline'
import { Input } from '../../components/ui/Input'
import { PageContent } from '../../components/ui/PageContent'
import { useAppDispatch, useAppSelector } from '../../redux'
import { setPrimaryProjectLink } from '../../redux/settings'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Links(): ReactElement | null {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const primaryProjectLink = useAppSelector(
    (state) => state.settings.primaryProjectLink,
  )

  const [primaryProjectLinkLabel, setPrimaryProjectLinkLabel] = useState(
    primaryProjectLink?.label ?? '',
  )
  const [primaryProjectLinkUrl, setPrimaryProjectLinkUrl] = useState(
    primaryProjectLink?.url ?? '',
  )

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

    console.log('blub')

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

  return (
    <>
      <Head>
        <title>{getPageTitle(t('settings:links.title'))}</title>
      </Head>

      <Layout left={<SettingsPagesList currentId="links" />}>
        <PageContent title={t('settings:links.title')} centered={true}>
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

            <div>
              <Button
                type="primary"
                className="flex-0"
                icon={<SaveIcon />}
                disabled={!primaryProjectLinkIsValid}
              >
                {t('buttons.save')}
              </Button>
            </div>
          </form>
        </PageContent>
      </Layout>
    </>
  )
}
