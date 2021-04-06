export class DecForm {
    errorfieldname = false;
    errorfieldprogramtext = false;
    errorfieldprogram = false;
    errorfieldprogramoutrotext = false;
    errorfieldtitle = false;
    errorfieldhowmany = false;
    errorfieldpreserv = false;
    errorfieldpreservoutro = false;
    errorfieldpreservoutrotext = false;
    errorfieldhowmanyspecie = false;
    errorfieldorder = false;
    errorfieldfamily = false;
    errorfieldgenre = false;
    errorfieldspecie = false;
    errorfieldtech = false;
    errorfieldstudent = false;
    errorfieldsupervisor = false;
    errorfieldcurator = false;
    errorfieldcuradoria = false;

    msgerrorfieldname = '';
    msgerrorfieldprogramtext = '';
    msgerrorfieldprogram = '';
    msgerrorfieldprogramoutrotext = '';
    msgerrorfieldtitle = '';
    msgerrorfieldhowmany = '';
    msgerrorfieldpreserv = '';
    msgerrorfieldpreservoutro = '';
    msgerrorfieldpreservoutrotext = '';
    msgerrorfieldhowmanyspecie = '';
    msgerrorfieldorder = '';
    msgerrorfieldfamily = '';
    msgerrorfieldgenre = '';
    msgerrorfieldspecie = '';
    msgerrorfieldtech = '';
    msgerrorfieldstudent = '';
    msgerrorfieldsupervisor = '';
    msgerrorfieldcurator = '';
    msgerrorfieldcuradoria = '';

    constructor(
        public fieldname: string,
        public fieldprogramtext: string,
        public fieldprogram: string,
        public fieldprogramoutrotext: string,
        public fieldtitle: string,
        public fieldhowmany: string,
        public fieldpreserv: any[],
        public fieldpreservoutro: string,
        public fieldpreservoutrotext: string,
        public fieldhowmanyspecie: string,
        public fieldorder: string,
        public fieldfamily: string,
        public fieldgenre: string,
        public fieldspecie: string,
        public fieldtech: string,
        public fieldstudent: string,
        public fieldsupervisor: string,
        public fieldcurator: string,
        public fieldcuradoria: string
    ) {}
}
