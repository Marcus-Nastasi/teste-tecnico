import { ForbiddenException, Injectable } from '@nestjs/common';
import { OperacaoDto } from './operacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperacoesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async adicao(operacaoDto: OperacaoDto) {
    const { valor1, valor2 } = operacaoDto;
    const resultado = valor1 + valor2;
    const novaOperacao = await this.prisma.operacao.create({
      data: {
        valor1,
        valor2,
        resultado,
        tipo: 1
      }
    });
    if (!novaOperacao) throw new ForbiddenException('Não foi possível registrar a operação, tente novamente.')
    return { resultado };
  }
}
