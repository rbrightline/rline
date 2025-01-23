import { formatFiles, Tree } from '@nx/devkit';

export async function syncGenerator(tree: Tree) {
  await formatFiles(tree);
}

export default syncGenerator;
