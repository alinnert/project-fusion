import { Project } from '../../redux/projects'

export function defaultProjectSorting(
  projectA: Project,
  projectB: Project,
): number {
  const bothAreImportant = projectA.important && projectB.important
  const neitherAreImportant = !projectA.important && !projectB.important

  if (bothAreImportant || neitherAreImportant) {
    // TODO: Only parse projectNumber if it really is a number.
    // Some project numbers could be alphanumeric.
    const pnOfProjA = parseInt(projectB.projectNumber)
    const pnOfProjB = parseInt(projectA.projectNumber)

    if (pnOfProjA > pnOfProjB) {
      return 1
    }

    if (pnOfProjA < pnOfProjB) {
      return -1
    }

    return 0
  }

  if (projectA.important) {
    return -1
  }

  if (projectB.important) {
    return 1
  }

  return 0
}
