# XSLTGG (Easy XSLT to HTML)
<p align="center">
<img src="https://github.com/manuelmsni/XSLTGG/blob/main/XSLTGG.jpg?raw=true" width="400px" >
</p>

## Description:
XSLTGG is a lightweight script that allows you to import data from XML and XSLT files into your HTML.

###   - Example of usage
    <!-- path.xml is the path of your XML document -->
    <!-- path.xls is the path of your XSLT document -->
    <!-- fatherId is the id of the element of your HTML in which you want to include the "data" from your XML -->
    
    <body onload="XSLTGG('path.xml', 'path.xsl', 'fatherId')">
        <section id="fatherId">
        </section>
    </body>
    
GG, easy! :)

## Easy set up XSLTGG:
Implementing XSLTGG is straightforward.

###   - Script (JavaScript)
    <!-- Place the following code in the HTML head -->
    <script type="text/javascript" src="https://manuelmsni.github.io/XSLTGG/XSLTGG_1.0/XSLTGG.js"></script>
