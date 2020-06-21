import readlineSync from 'readline-sync';
import colors from 'colors';
import menu from './menu.json';
import dotenv from 'dotenv';
import { actions } from './actions';
import { erro } from './actions/utils';

//Carga do arquivo .env nas variáveis de ambiente
dotenv.config();
header();

let opcao = '';
while (opcao.toLowerCase() != 's') {
  Object.keys(menu.menus).forEach((m: string) => {
    menuItem(m, (menu.menus as { [key: string]: any })[m].label);
  });
  menuItem('S', 'Sair');

  opcao = readlineSync.question(`Sua opção:`);
  executaEscolha(opcao);
}

function executaEscolha(opcao: string): void {
  if (opcao.toLowerCase() != 's') {
    const nomeFuncao = (menu.menus as { [key: string]: any })[opcao]
      ?.functionExec;
    if (nomeFuncao) {
      (actions as { [key: string]: any })[nomeFuncao]();
    } else {
      erro(`Opção inválida!`);
    }
  }
}

function header(): void {
  console.log(
    colors.bgYellow(
      `Gerador Automático de Imagens Docker`.padStart(50, ' ').padEnd(75, ' '),
    ).black,
  );
  console.log();
}
function menuItem(key: string, label: string): void {
  if (key == 'S') console.log();
  console.log(colors.red(key), '.', colors.yellow(label));
  if (key == 'S') console.log();
}
