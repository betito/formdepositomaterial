import { Component, OnInit } from '@angular/core';
import { DecForm } from './dec-form';

import * as jsPDF from 'jspdf';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Declaração de Depósito';
  isHidden = true;
  isHidden2 = true;
  programas = [ 'IC', 'TCC', 'MESTRADO', 'DOUTORADO', 'PÓS-DOUTORADO', 'OUTRO'];
  curadorias = [ 'Anfíbios e Répteis', 'Aves', 'Herbário', 'Invertebrados', 'Mamíferos', 'Microrganismos de Interesse Agrossilvicultural',
                 'Microrganismos de Interesse Médico', 'Peixes' , 'Recursos Genéticos'];
  preservation = [
     {name: 'À SECO', checked: false },
     {name: 'EM FRASCOS COM ÁLCOOL', checked: false },
     {name: 'EM LÂMINAS', checked: false },
     {name: 'OUTRO', checked: false }
  ];

  decFormModel = new DecForm('', '', '', '', '', '', this.preservation, '', '', '', '', '', '', '', '', '', '', '');

  constructor() {
  }

  ngOnInit(): void {
  }

  public check1(event) {
    if (event.target.value === 'OUTRO') {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
  }

  public check2(event) {
    if (event.target.value === 'OUTRO') {
      this.isHidden2 = false;
    } else {
      this.isHidden2 = true;
    }
  }

  changeSelection(e) {
    console.log(e.value + ' = ' + e.checked);
    this.preservation.forEach ( (elem) => {
      if (elem.name === e.value) {
        elem.checked = e.checked;
      }
    });
    this.decFormModel.fieldpreserv = this.preservation;

    if ((e.value === 'OUTRO') && (e.checked === true)) {
      this.isHidden2 = false;
    } else {
      this.isHidden2 = true;
    }


    console.log(this.preservation);
  }


  private validateForm() {

    if (this.decFormModel.fieldname === '' ) {
      this.decFormModel.msgerrorfieldname = 'Precisa preencher o NOME';
      this.decFormModel.errorfieldname = true;
      return false;
    }

    if (this.decFormModel.fieldprogramtext === '' ) {
      this.decFormModel.msgerrorfieldprogramtext = 'Precisa preencher o PROGRAMA';
      this.decFormModel.errorfieldprogramtext = true;
      return false;
    }

    if ((this.decFormModel.fieldprogram === 'OUTRO') &&
        (this.decFormModel.fieldprogramoutrotext === '')) {
      this.decFormModel.msgerrorfieldprogramoutrotext = 'Precisa preencher o campo OUTRO';
      this.decFormModel.errorfieldprogramoutrotext = true;
      return false;
    }

    if (this.decFormModel.fieldprogram === '' ) {
      this.decFormModel.msgerrorfieldprogram = 'Precisa preencher o PROGRAMA';
      return false;
    }

    if (this.decFormModel.fieldtitle === '' ) {
      this.decFormModel.msgerrorfieldtitle = 'Precisa preencher o TÍTULO';
      return false;
    }

    if (this.decFormModel.fieldhowmany === '' ) {
      this.decFormModel.msgerrorfieldhowmany = 'Precisa preencher a QUANTIDADE';
      return false;
    }

    if (this.decFormModel.fieldhowmanyspecie === '' ) {
      this.decFormModel.msgerrorfieldhowmanyspecie = 'Precisa preencher a QUANTIDADE DE ESPÉCIES';
      return false;
    }

    if (this.decFormModel.fieldorder === '' ) {
      this.decFormModel.msgerrorfieldorder = 'Precisa preencher a ORDEM';

      return false;
    }

    if (this.decFormModel.fieldfamily === '' ) {
      this.decFormModel.msgerrorfieldfamily = 'Precisa preencher a FAMÍLIA';
      return false;
    }

    if (this.decFormModel.fieldspecie === '' ) {
      this.decFormModel.msgerrorfieldspecie = 'Precisa preencher a ORDEM';
      return false;
    }

    if (this.decFormModel.fieldgenre === '' ) {
      this.decFormModel.msgerrorfieldgenre = 'Precisa preencher a GÊNERO';
      return false;
    }

    if (this.decFormModel.fieldtech === '' ) {
      this.decFormModel.msgerrorfieldtech = 'Precisa preencher o nome do TÉCNICO da coleção que o acompanhou';
      return false;
    }

    if (this.decFormModel.fieldstudent === '' ) {
      this.decFormModel.msgerrorfieldstudent = 'Precisa preencher o nome do DISCENTE';
      return false;
    }

    if (this.decFormModel.fieldsupervisor === '' ) {
      this.decFormModel.msgerrorfieldsupervisor = 'Precisa preencher o nome do ORIENTADOR';
      return false;
    }

    if (this.decFormModel.fieldcurator === '' ) {
      this.decFormModel.msgerrorfieldcurator = 'Precisa preencher o nome do CURADOR';
      return false;
    }

    return true;
  }

  public downloadAsPDF() {

    //if (this.validateForm()) {

      let imgData1 = './assets/imgs/brasao.png';
      let imgData2 = './assets/imgs/inpa-colecoesinpa-mctic.jpg';
      let content = '';
      const x = 20;
      let y = 40;
      const x_meio = 105;

      const doc = new jsPDF();

      //content += '<img width="75px" src="./assets/imgs/brasao.png" alt="Brasão"/><br/>';
      const img = new Image();
      img.src = imgData1;
      doc.addImage(img, 'PNG', x_meio - 10, y - 20, 15, 15);

      doc.setFontSize(8);
      content = 'MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO - MCTI\n';
      doc.text (content, x_meio, y, null, null, 'center');
      doc.setFontSize(11);
      content = 'INSTITUTO NACIONAL DE PESQUISAS DA AMAZÔNIA\n';
      doc.text (content, x_meio, y + 4, null, null, 'center');
      doc.setFontSize(9);
      content = 'PROGRAMA DE COLEÇÕES CIENTÍFICAS BIOLÓGICAS - PCCB\n';
      content += 'Avenida André Araújo, 2936 - Petrópolis – 69.067-375 – Manaus, Amazonas, Brasil';
      doc.text (content, x_meio, y + 8, null, null, 'center');
      doc.setFontSize(16);
      doc.setFontType('bold');
      content = '\n\nDECLARAÇÃO\n\n';
      doc.text (content, x_meio, y + 15, null, null, 'center');
      doc.setFontType ('normal');
      doc.setFontSize(12);
      content = 'Declaro que:\n\n';
      this.buildDoc (doc, content, '', x, 85);

      y = 92;
      this.buildDoc (doc, 'Nome:\t\t\t\t', this.decFormModel.fieldname, x, y);
      this.buildDoc (doc, 'Programa:\t\t\t\t', this.decFormModel.fieldprogramtext, x, y += 7);
      this.buildDoc (doc, 'Nível:\t\t\t\t', this.decFormModel.fieldprogramoutrotext, x, y += 7);

      let preserv = '';
      this.preservation.forEach((elem) => {
        if (elem.checked) {
          preserv +=  '( X ) ' + elem.name + '\n';
        } else {
          preserv +=  '(    ) ' + elem.name + '\n';
        }
      });
      preserv += '\nOutro: ' + this.decFormModel.fieldpreservoutrotext;

      this.buildDoc (doc, 'Preservação:\t\t\t\t', preserv, x, y += 7);
      y += 30;
      this.buildDoc (doc, 'Título do trabalho::\t\t\t\t', this.decFormModel.fieldtitle, x, y += 7);
      this.buildDoc (doc, 'depositou na coleção de Invertebrados do INPA o seguinte material biológico:', '', x, y += 7);
      this.buildDoc (doc, 'Quantidade:', this.decFormModel.fieldhowmany, x, y += 7);
      this.buildDoc (doc, 'Quantidade de espécies:\t\t\t\t', this.decFormModel.fieldhowmanyspecie, x, y += 7);
      this.buildDoc (doc, 'Ordem:\t\t\t\t', this.decFormModel.fieldorder, x, y += 7);
      this.buildDoc (doc, 'Família (s):\t\t\t\t', this.decFormModel.fieldfamily, x, y += 7);
      this.buildDoc (doc, 'Gênero:\t\t\t\t', this.decFormModel.fieldgenre, x, y += 7);
      this.buildDoc (doc, 'Espécie: \t\t\t\t', this.decFormModel.fieldspecie, x, y += 7);

      const signature =  '\n(ASSINATURA) ____________________________ ';
      this.buildDoc (doc, 'TÉCNICO DA COLEÇÃO*:\n*conferente\t\t\t\t', this.decFormModel.fieldtech + signature, x, y += 15);
      this.buildDoc (doc, 'DISCENTE:\t\t\t\t', this.decFormModel.fieldstudent + signature, x, y += 15);
      this.buildDoc (doc, 'ORIENTADOR:\t\t\t\t', this.decFormModel.fieldsupervisor + signature, x, y += 15);
      this.buildDoc (doc, 'CURADOR:\t\t\t\t', this.decFormModel.fieldcurator + signature, x, y += 15);
      //this.buildDoc (doc, '*conferente', '', x, y += 7);

      const img2 = new Image();
      img2.src = imgData2;
      doc.addImage(img2, 'PNG', x_meio-10, y +=10, 90, 15);


      doc.save ('declaracao.pdf');

    // } else {
    //   alert ('Existem campos que precisam ser revisados.');
    // }
  }


  private buildDoc(doc, label, value, curx, cury) {
      let x_offset = 85;
      doc.setFontType ('normal');
      doc.text(label, curx, cury);
      doc.setFontType ('bold');
      doc.text(value, x_offset, cury);
  }

}
