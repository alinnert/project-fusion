export function getPageTitle(title?: string): string {
  const appName = 'ProjectFusion'
  return title === undefined ? appName : `${appName}: ${title}`
}
