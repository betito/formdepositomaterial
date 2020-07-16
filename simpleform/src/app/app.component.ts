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

    if (this.validateForm()) {

      ///let imgData = './assets/imgs/brasao.png';
      let content = '';

      const doc = new jsPDF();

      //doc.addImage(imgData, 'PNG', 15, 40, 180, 160);
      //doc.addImage(imgData, 'PNG', 15, 40, 180, 160);
      const x = 50;
      const y = 40;
      doc.setFontSize(8);

      content = 'MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO - MCTI';
      doc.text(content, x, y);
      doc.setFontSize(11);
      content = '\nINSTITUTO NACIONAL DE PESQUISAS DA AMAZÔNIA';
      doc.text(content, x, y + 1);
      doc.setFontSize(9);
      content = '\n\nPROGRAMA DE COLEÇÕES CIENTÍFICAS BIOLÓGICAS - PCCB';
      doc.text(content, x, y + 2);
      doc.setFontSize(8);
      content = '\n\n\nAvenida André Araújo, 2936 - Petrópolis – 69.067-375 – Manaus, Amazonas, Brasil';
      doc.text(content, x, y + 3);
      doc.setFontSize(13);
      content = '\n\n\n\n\n\nNome: ' + this.decFormModel.fieldname;
      content += '\n' +  'Programa: ' + this.decFormModel.fieldprogramtext;
      content += '\n' + this.decFormModel.fieldprogramoutrotext;
      let preserv = '';
      this.preservation.forEach((elem) => {
        if (elem.checked) {
          preserv += ' ( X ) ' + elem.name + '\n';
        } else {
          preserv += ' (    ) ' + elem.name + '\n';
        }
      });

      content += '\nPreservação: \n' + preserv;
      content += '\nTítulo do trabalho: ' + this.decFormModel.fieldtitle;
      content += '\ndepositou na coleção de Invertebrados do INPA o seguinte material biológico:';
      content += '\nQuantidade: ' + this.decFormModel.fieldhowmany;
      content += '\nOutro: ' + this.decFormModel.fieldpreservoutrotext;
      content += '\nQuantidade de espécies: ' + this.decFormModel.fieldhowmanyspecie;
      content += '\nOrdem: ' + this.decFormModel.fieldorder;
      content += '\nFamília (s): ' + this.decFormModel.fieldfamily;
      content += '\nGênero: ' + this.decFormModel.fieldgenre;
      content += '\nEspécie: ' + this.decFormModel.fieldspecie;
      let table = '';
      table += '\n\n\n                                             NOME                                   ASSINATURA';
      table += '\n\nTÉCNICO DA COLEÇÃO*: ' + this.decFormModel.fieldtech;
      table += '\n\nDISCENTE: ' + this.decFormModel.fieldstudent;
      table += '\n\nORIENTADOR: ' + this.decFormModel.fieldsupervisor;
      table += '\n\nCURADOR: ' + this.decFormModel.fieldcurator;
      table += '\n\n*conferente';
      content += table;
      doc.text (content, x - 30, y + 10);
      doc.save ('declaracao.pdf');

    } else {
      alert ('Existem campos que precisam ser revisados.');
    }
  }

}
