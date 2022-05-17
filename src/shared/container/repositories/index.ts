import { container } from 'tsyringe';
import { CONTAINER } from '../../application/constants/container';

import { EstudanteRepository } from '@shared/infra/data/repositories/implementations/EstudanteRepository';

container.registerSingleton(
  CONTAINER.REPOSITORIES.ESTUDANTE,
  EstudanteRepository,
);
