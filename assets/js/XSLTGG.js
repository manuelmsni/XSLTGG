function loadXMLDoc(filename){
    if (window.ActiveXObject){
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {
        xhttp.responseType = "msxml-document"
    } catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

function returnResult(xmlPath, xsltPath){
    xml = loadXMLDoc(xmlPath);
    xsl = loadXMLDoc(xsltPath);
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document"){
        return xml.transformNode(xsl);
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument){
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        console.log(resultDocument);
        return resultDocument;
    }
}

function fetchData(xmlPath, xsltPath, elementId){
    result = returnResult(xmlPath, xsltPath);
    document.getElementById(elementId).appendChild(result);
}
