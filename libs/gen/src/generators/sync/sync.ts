import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { SyncGeneratorSchema } from './schema';

export async function syncGenerator(tree: Tree, options: SyncGeneratorSchema) {
  const projectRoot = `libs/type/src/lib`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default syncGenerator;
