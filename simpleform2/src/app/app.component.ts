import { Component, OnInit } from '@angular/core';
import { DecForm } from './dec-form';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

  decFormModel = new DecForm('', '', '', '', '', '', this.preservation, '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  y = 82; // 

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


public newdownload(){

  let imgData1 = './assets/imgs/brasao.png';
  var element = document.getElementById ("allmycontent");

  
  html2canvas(element).then((canvas) => {
    console.log(canvas);

    var imgData = canvas.toDataURL(imgData1);

    const doc = new jsPDF('p', 'mm', 'a4', true);

    doc.addImage(imgData, 0, 0, 208, 500);

    doc.save ('declaracao.pdf');
  });
}

  public downloadAsPDF() {

    //if (this.validateForm()) {

      let content = '';
      const x = 20;
      this.y = 40;
      const x_meio = 105;

      const doc = new jsPDF('p', 'mm', 'a4', true);

      this.writeHeader(doc);
      this.writeFooter (doc);
      
      doc.setFontSize(16);
      doc.setFont('Verdana','bold');
      content = '\n\nDECLARAÇÃO\n\n';
      doc.text (content, x_meio - 25, this.y + 10);
      doc.setFont('Verdana','normal');
      doc.setFontSize(12);
      content = 'Declaro que:\n\n';
      this.buildDoc (doc, content, '', x, 75);

      this.y = 82;
      this.buildDoc (doc, 'Nome:\t\t\t\t', this.decFormModel.fieldname, x, this.y);
      this.buildDoc (doc, 'Programa:\t\t\t\t', this.decFormModel.fieldprogramtext, x, this.y += 7);
      this.buildDoc (doc, 'Nível:\t\t\t\t', this.decFormModel.fieldprogramoutrotext, x, this.y += 7);
      this.buildDoc (doc, 'Curadoria:\t\t\t\t', this.decFormModel.fieldcuradoria, x, this.y += 7);

      let preserv = '';
      this.preservation.forEach((elem) => {
        if (elem.checked) {
          preserv +=  '( X ) ' + elem.name + '\n';
        } else {
          preserv +=  '(    ) ' + elem.name + '\n';
        }
      });
      preserv += '\nOutro: ' + this.decFormModel.fieldpreservoutrotext;

      this.buildDoc (doc, 'Preservação:\t\t\t\t', preserv, x, this.y += 7);
      this.y += 30;
      this.buildDoc (doc, 'Data (mm/dd/yyyy):\t\t\t\t', this.decFormModel.fielddate, x, this.y += 7);

      this.buildDoc (doc, 'Título do trabalho:\t\t\t\t', '', x, this.y += 7);
      var splitText = doc.splitTextToSize(this.decFormModel.fieldtitle, 120);
      doc.setFontSize(11);
      var y1 = this.y;
      let tit = '';
      for (var xsplit of splitText){
        console.log(y1);
        this.buildDoc(doc, '', xsplit, x, this.y += 7);     
      }

      this.buildDoc(doc, '', tit, x, this.y += 7);
      this.buildDoc (doc, 'depositou na coleção de Invertebrados do INPA o seguinte material biológico:', '', x, this.y += 7);
      this.buildDoc (doc, 'Quantidade:', this.decFormModel.fieldhowmany, x, this.y += 7);
      this.buildDoc (doc, 'Quantidade de espécies:\t\t\t\t', this.decFormModel.fieldhowmanyspecie, x, this.y += 7);
      this.buildDoc (doc, 'Ordem:\t\t\t\t', this.decFormModel.fieldorder, x, this.y += 7);
      this.buildDoc (doc, 'Família (s):\t\t\t\t', this.decFormModel.fieldfamily, x, this.y += 7);
      this.buildDoc (doc, 'Gênero:\t\t\t\t', this.decFormModel.fieldgenre, x, this.y += 7);
      this.buildDoc (doc, 'Espécie: \t\t\t\t', this.decFormModel.fieldspecie, x, this.y += 7);
      this.buildDoc (doc, 'Núm. de registro: \t\t\t\t', this.decFormModel.fieldnumreg, x, this.y += 7);

      const signature =  '\n(ASSINATURA) ____________________________ ';
      this.buildDoc (doc, 'TÉCNICO DA COLEÇÃO*:\n*conferente\t\t\t\t', this.decFormModel.fieldtech + signature, x, this.y += 15);
      this.buildDoc (doc, 'DISCENTE:\t\t\t\t', this.decFormModel.fieldstudent + signature, x, this.y += 15);
      this.buildDoc (doc, 'ORIENTADOR:\t\t\t\t', this.decFormModel.fieldsupervisor + signature, x, this.y += 15);
      this.buildDoc (doc, 'CURADOR:\t\t\t\t', this.decFormModel.fieldcurator + signature, x, this.y += 15);

      doc.save ('declaracao.pdf');

    // } else {
    //   alert ('Existem campos que precisam ser revisados.');
    // }
  }


  private buildDoc(doc, label, value, curx, cury) {
    let pageHeight = doc.internal.pageSize.height;
    let x_offset = 85;

    if (cury > pageHeight - 40) {

        this.addNewPage(doc);
        this.y = 70;
        doc.setFont('times','normal');
        doc.text(label, curx, this.y);
        doc.setFont('times','bold');
        doc.text(value, x_offset, this.y);


    }else{
      
      doc.setFont('times','normal');
      doc.text(label, curx, cury);
      doc.setFont('times','bold');
      doc.text(value, x_offset, cury);
    }
  }

  
  private writeHeader (doc){

    let imgData = './assets/imgs/brasao.png';
    let content = '';
    const x_meio = 105;
    let y = 40;
    
    const img = new Image();
    img.src = imgData;
    doc.addImage(img, 'PNG', 95, 20, 15, 15, undefined, 'FAST'); 

    doc.setFontSize(8);
    content = 'MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO - MCTI\n';
    doc.text (content, x_meio - 45, y );
    doc.setFontSize(11);
    content = 'INSTITUTO NACIONAL DE PESQUISAS DA AMAZÔNIA\n';
    doc.text (content, x_meio - 55, y + 4);
    doc.setFontSize(9);
    content = 'PROGRAMA DE COLEÇÕES CIENTÍFICAS BIOLÓGICAS - PCCB\n';
    doc.text (content, x_meio - 50, y + 8);
    content = 'Avenida André Araújo, 2936 - Petrópolis – 69.067-375 – Manaus, Amazonas, Brasil';
    doc.text (content, x_meio - 60, y + 12);
  }

  private writeFooter (doc){

    let imgData = './assets/imgs/inpa-colecoesinpa-mctic.jpg';

    const img = new Image();
    img.src = imgData;
    doc.addImage(img, 'JPG', 95, 270, 90, 15, undefined,'FAST'); 

  }


  private addNewPage (doc){    

    doc.addPage();
    this.writeHeader (doc);
    this.writeFooter (doc);

  }

}
