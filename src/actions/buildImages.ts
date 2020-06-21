import fs, { readFileSync } from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { validaEnv, erro } from './utils';

export function buildImages(): void {
  if (validaEnv('PATH_OUTPUT')) {
    //valida existência do diretório de output
    if (!fs.existsSync(process.env.PATH_OUTPUT as string)) {
      erro(`Diretório de saída '${process.env.PATH_OUTPUT}' não existe`);
      return;
    }
    const children = fs.readdirSync(process.env.PATH_OUTPUT as string);
    //valida existência de subdiretórios no output (deveria haver se a cópia foi executada)
    if (children.length == 0) {
      erro(
        `Diretório de saída '${process.env.PATH_OUTPUT}' não possui conteúdo. As etapas de cópia do conteúdo de origem deve ser executada previamente.`,
      );
      return;
    }

    for (let i = 0; i < children.length; i++) {
      if (
        !fs.existsSync(
          path.join(
            process.env.PATH_OUTPUT as string,
            children[i],
            `Dockerfile`,
          ),
        )
      ) {
        erro(
          `Dockerfile '${path.join(
            process.env.PATH_OUTPUT as string,
            children[i],
            'Dockerfile',
          )}
          )}' não encontrado`,
        );
      }
      const prefixoTag = process.env.DOCKER_TAG_PREFIX
        ? process.env.DOCKER_TAG_PREFIX.toLowerCase()
        : '';
      const comando = `docker build ${path.join(
        process.env.PATH_OUTPUT as string,
        children[i],
        '.',
      )} -t ${prefixoTag}${children[i].toLowerCase()}`;
      console.log(comando);
      shelljs.exec(comando);
    }
  }
}
