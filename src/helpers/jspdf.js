import jsPDF from 'jspdf'

export const jspdf = function (questionsArray, clearString) {

    var doc = new jsPDF('portrait', 'mm', 'a4');
    var lMargin = 15; //left margin in mm
    var rMargin = 15; //right margin in mm
    var pdfInMM = 210;  // width of A4 in mm
    var pageCenter = pdfInMM / 2;
    doc.setFontSize(10);
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var height = 0;
    var marginTop = 20;
    height += marginTop;
    var counter = 1;
    var questionGap = 15;
    var answerGap = 7;

    for (var x = 0; x <= questionsArray.length - 1; x++) {

        let body = counter + ": " + questionsArray[x].body;
        let removeDiacriticalMarks = clearString(body);
        let content = doc.splitTextToSize(removeDiacriticalMarks, (pdfInMM - lMargin - rMargin));
        doc.text(content, pageCenter, height, 'center');
        height += answerGap;

        if (height > pageHeight - 30) {
            height = 0;
            height += marginTop;
            doc.addPage();
        }

        if ((questionsArray[x].imageUrl !== "") && (questionsArray[x].imageUrl.startsWith("img/"))) {

            var img = new Image();
            img.src = questionsArray[x].imageUrl;
            doc.addImage(img, pageCenter / 2.6, height, 140, 50);
            height += 60;

            if (height > pageHeight - 60) {
                height = 0;
                height += marginTop;
                doc.addPage();
            }

        }

        if (height > pageHeight - 60) {
            height = 0;
            height += marginTop;
            doc.addPage();
        }

        let answerA = "A: " + questionsArray[x].answerA;
        let AremoveDiacriticalMarks = clearString(answerA);
        let Acontent = doc.splitTextToSize(AremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
        doc.text(Acontent, pageCenter, height, 'center');
        height += answerGap;

        let answerB = "B: " + questionsArray[x].answerB;
        let BremoveDiacriticalMarks = clearString(answerB);
        let Bcontent = doc.splitTextToSize(BremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
        doc.text(Bcontent, pageCenter, height, 'center');
        height += answerGap

        let answerC = "C: " + questionsArray[x].answerC;
        let CremoveDiacriticalMarks = clearString(answerC);
        let Ccontent = doc.splitTextToSize(CremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
        doc.text(Ccontent, pageCenter, height, 'center');
        height += answerGap;

        let answerD = "D: " + questionsArray[x].answerD;
        let DremoveDiacriticalMarks = clearString(answerD);
        let Dcontent = doc.splitTextToSize(DremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
        doc.text(Dcontent, pageCenter, height, 'center');
        height += questionGap;

        if (height > pageHeight - (questionGap)) {
            height = 0;
            height += marginTop;
            doc.addPage();
        }
        counter++;
    }
    doc.save("Generated test.pdf");
}