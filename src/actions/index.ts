import { copyOrigin } from './copyOrigin';
import { createDockerfiles } from './createDockerfiles';
import { buildImages } from './buildImages';
import { runContainers } from './runContainers';

export const actions = {
  copyOrigin,
  createDockerfiles,
  buildImages,
  runContainers,
};
