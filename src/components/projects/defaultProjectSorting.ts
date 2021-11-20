import { Project } from '../../redux/projects';

export function defaultProjectSorting(projectA: Project, projectB: Project): number {
  if ((projectA.important && projectB.important) ||
    (!projectA.important && !projectB.important)) {
    const pnA = parseInt(projectB.projectNumber);
    const pnB = parseInt(projectA.projectNumber);
    return pnA > pnB ? 1 : pnA < pnB ? -1 : 0;
  }
  if (projectA.important)
    return -1;
  if (projectB.important)
    return 1;
  return 0;
}
