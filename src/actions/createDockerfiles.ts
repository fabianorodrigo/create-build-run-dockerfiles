import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { validaEnv, erro } from './utils';

export function createDockerfiles(): void {
  if (validaEnv('PATH_OUTPUT') && validaEnv('DOCKER_FROM')) {
    //valida existência do diretório de output
    if (!fs.existsSync(process.env.PATH_OUTPUT as string)) {
      erro(`Diretório de saída '${process.env.PATH_OUTPUT}' não existe`);
      return;
    }
    const children = fs.readdirSync(process.env.PATH_OUTPUT as string);
    //valida existência de subdiretórios no output (deveria haver se a cópia foi executada)
    if (children.length == 0) {
      erro(
        `Diretório de saída '${process.env.PATH_OUTPUT}' não possui conteúdo. A etapa de cópia deve ser executada previamente.`,
      );
      return;
    }

    children.forEach((f: string) => {
      let dockerfile = '';
      dockerfile += `FROM ${process.env.DOCKER_FROM}\n`;
      if (process.env.DOCKER_MAINTAINER) {
        dockerfile += `MAINTAINER ${process.env.DOCKER_MAINTAINER}\n`;
      }
      dockerfile += `COPY ${
        process.env.DOCKER_IMAGE_USER
          ? ` --chown=${process.env.DOCKER_IMAGE_USER}`
          : ''
      } ${f} ./${f}\n`;
      //muda diretório para o diretório copiado
      dockerfile += `WORKDIR ${f}\n`;
      if (process.env.DOCKER_CMD) {
        dockerfile += `CMD ${process.env.DOCKER_CMD}\n`;
      }
      console.log(dockerfile, '\n');
      /*const dockerFileDir = 
      if (!fs.existsSync(path.join(process.env.PATH_OUTPUT as string, f))) {
        fs.mkdirSync(`./output/${f}`);
      }*/
      fs.writeFileSync(
        path.join(process.env.PATH_OUTPUT as string, f, `Dockerfile`),
        dockerfile,
      );
    });
  }
}
