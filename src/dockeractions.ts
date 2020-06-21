import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';

const source = `/home/fabiano/Projetos/20190715Selecionados/`;

fs.readdirSync(source).forEach(f=>{
  let dockerfile = '';
  dockerfile+= 'FROM fabianorodrigo/node10_truffle5_0_27:0.1.0\n';
  dockerfile+= 'MAINTAINER Fabiano Nascimento <fabrodrigo@hotmail.com>\n';
  dockerfile+= `COPY --chown=node ${f} ./${f}\n`;
  dockerfile+= `CMD cd ${f} && npx solidity-coverage\n`; 
  console.log(dockerfile);
  if(!fs.existsSync(`./output/${f}`)){
    fs.mkdirSync(`./output/${f}`);
  }
  fs.writeFileSync(`./output/${f}/Dockerfile`,dockerfile);
  //copiando o diretorio do projeto pro output
  //shelljs.cp(`-r`,`${source}${f}`,`./output/${f}`);
  shelljs.exec(`docker build output/${f} -t fabianorodrigo/unirio_${f.toLowerCase()}`);
})
