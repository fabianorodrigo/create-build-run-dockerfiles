import readlineSync from 'readline-sync';
import colors from 'colors';
import menu from './menu.json';

console.log(
  colors.bgYellow(
    `Gerador Automático de Imagens Docker`.black
      .padStart(50, '*')
      .padEnd(50, '*'),
  ),
);

console.log('Selecione uma opção:'.yellow);

let opcao = '';
while (opcao.toLocaleLowerCase() != 's') {
  Object.keys(menu.menus).forEach((m) => {
    console.log(colors.red(m), '.', colors.yellow(menu.menus[m].label));
  });

  opcao = readlineSync.question(`Sua opção:`);

  eval(menu.menus[opcao].functionExec.concat('()'));
}
