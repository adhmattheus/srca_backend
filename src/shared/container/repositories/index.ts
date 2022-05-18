import { container } from 'tsyringe';
import { CONTAINER } from '../../application/constants/container';

import { EstudanteRepository } from '@shared/infra/data/repositories/implementations/EstudanteRepository';
import { AgendamentoRepository } from '@shared/infra/data/repositories/implementations/AgendamentoRepository';

container.registerSingleton(
  CONTAINER.REPOSITORIES.ESTUDANTE,
  EstudanteRepository,
);

container.registerSingleton(
  CONTAINER.REPOSITORIES.AGENDAMENTO,
  AgendamentoRepository,
);
