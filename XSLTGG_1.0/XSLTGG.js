function loadXMLDoc(filename){
    if (window.ActiveXObject){
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {
        xhttp.responseType = "msxml-document";
    } catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

function getFragment(xmlPath, xsltPath){
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

function XSLTGG(xmlPath, xsltPath, elementId){
    document.getElementById(elementId).appendChild(getFragment(xmlPath, xsltPath));
}

/* ------------------------------------ xPath ------------------------------------ */

function check_xpath(xmlPath, path, fatherId) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showResult(xhttp.responseXML, path, fatherId);
        }
    };
    xhttp.open("GET", xmlPath, true);
    xhttp.send();
}

function showResult(xml, path, fatherId) {
    var txt = "";
    if (xml.evaluate) {
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);/*
        var result = nodes.iterateNext();
        while (result) {
            txt += result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
        }*/
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xml.setProperty("SelectionLanguage", "XPath");
        nodes = xml.selectNodes(path);/*
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }*/
    }
    nodeSpider(nodes);
    //document.getElementById(fatherId).innerHTML = txt;
}

function nodeSpider(root){
    var nodes = root.querySelectorAll("*");
    for (var i = 0; i < nodes.length; i++) {
        var text = null;
        if (nodes[i].childNodes.length == 1 && nodes[i].childNodes[0].nodeType == 3){ //if nodeType == text node
            text = nodes[i].textContent;
        } else{
            nodeSpider(nodes[i])
        }//get text of the node
        console.log("TageName : ", nodes[i].tagName, ", Text : ", text);
    }
}

