import { Tree, workspaceRoot } from '@nx/devkit';
import { cpSync } from 'fs';
import { join } from 'path';

export async function initGenerator(tree: Tree) {
  cpSync(join(__dirname, 'files'), workspaceRoot, { recursive: true });
}

export default initGenerator;
