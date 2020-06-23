import readlineSync from 'readline-sync';
import fs, { readFileSync } from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { validaEnv, erro } from './utils';
import moment from 'moment';

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

    let removerContainer = readlineSync
      .question(`Remover containeres após execução (S/n):`)
      .toUpperCase();
    if (removerContainer.trim() == '') {
      removerContainer = 'S';
    }

    const comandoHost = readlineSync.question(
      `Linha de comando a se executar no host (para referenciar o nome do container use #container#):`,
    );

    const datetime = moment().format('YYYYMMDDHHmm');
    for (let i = 0; i < children.length; i++) {
      try {
        const prefixoTag = process.env.DOCKER_TAG_PREFIX
          ? process.env.DOCKER_TAG_PREFIX.toLowerCase()
          : '';
        const childName = children[i].toLowerCase();
        const containerName = childName.concat('_', datetime);
        const comando = `docker run -i --name ${containerName} ${prefixoTag}${childName}`;
        console.log(comando);
        shelljs.exec(comando);
        if (comandoHost && comandoHost.trim().length > 0) {
          console.log(comandoHost.replace(/#container#/g, containerName));
          shelljs.exec(comandoHost.replace(/#container#/g, containerName));
        }
        if (removerContainer.toUpperCase() == 'S') {
          shelljs.exec(`docker stop ${containerName}`);
          shelljs.exec(`docker rm ${containerName}`);
        }
      } catch (e) {
        break;
      }
    }
  }
}
