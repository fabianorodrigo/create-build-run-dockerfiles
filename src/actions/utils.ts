import colors, { bgRed, white } from 'colors';

export function erro(msg: string) {
  console.log(bgRed(white(msg)));
}

export function validaEnv(chave: string) {
  if (
    process.env[chave] == null ||
    (process.env[chave] as string).trim().length == 0
  ) {
    erro(`A variável de ambiente 'HOME_ORIGIN' não foi informada`);
    return false;
  }
  return true;
}
