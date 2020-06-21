import fs from 'fs';
import shelljs from 'shelljs';
import { validaEnv, erro } from './utils';
import path from 'path';

export function copyOrigin(): void {
  if (validaEnv('HOME_ORIGIN') && validaEnv('PATH_OUTPUT')) {
    //valida existência do diretório de origem
    if (!fs.existsSync(process.env.HOME_ORIGIN as string)) {
      erro(`Diretório de origem '${process.env.HOME_ORIGIN}' não existe`);
      return;
    }
    const children = fs.readdirSync(process.env.HOME_ORIGIN as string);
    //valida existência de subdiretórios na origem
    if (children.length == 0) {
      erro(
        `Diretório de origem '${process.env.HOME_ORIGIN}' não possui conteúdo para serem copiados`,
      );
      return;
    }
    //Se o diretório de destino não existir, cria
    if (!fs.existsSync(process.env.PATH_OUTPUT as string)) {
      fs.mkdirSync(process.env.PATH_OUTPUT as string);
    }
    children.forEach((f: string) => {
      //Se o subdiretório de destino não existir, cria
      if (!fs.existsSync(path.join(process.env.PATH_OUTPUT as string, f))) {
        fs.mkdirSync(path.join(process.env.PATH_OUTPUT as string, f));
      }
      console.log(
        `cp -R ${path.join(process.env.HOME_ORIGIN as string, f)} ${path.join(
          process.env.PATH_OUTPUT as string,
          f,
          f,
        )}`,
      );
      shelljs.cp(
        `-r`,
        path.join(process.env.HOME_ORIGIN as string, f),
        path.join(process.env.PATH_OUTPUT as string, f, f),
      );
    });
  }
}
