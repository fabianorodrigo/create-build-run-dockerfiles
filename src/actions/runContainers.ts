import fs, { readFileSync } from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { validaEnv, erro } from './utils';

export function runContainers(): void {
  if (validaEnv('HOME_ORIGIN')) {
    //valida existência do diretório de origem
    if (!fs.existsSync(process.env.PATH_OUTPUT as string)) {
      erro(`Diretório de origem '${process.env.HOME_ORIGIN}' não existe`);
      return;
    }
    const children = fs.readdirSync(process.env.HOME_ORIGIN as string);
    //valida existência de subdiretórios no output (deveria haver se a cópia foi executada)
    if (children.length == 0) {
      erro(
        `Diretório de origem '${process.env.HOME_ORIGIN}' não possui conteúdo. Ele é necessário para se inferir quais imagens serão executadas.`,
      );
      return;
    }

    for (let i = 0; i < children.length; i++) {
      const prefixoTag = process.env.DOCKER_TAG_PREFIX
        ? process.env.DOCKER_TAG_PREFIX.toLowerCase()
        : '';
      const comando = `docker run -it ${prefixoTag}${children[
        i
      ].toLowerCase()}`;
      console.log(comando);
      shelljs.exec(comando);
    }
  }
}
