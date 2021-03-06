
module.exports = function () {/*

///*######################################################################
//#   primitives/text
//#####################################################################

SPAN.__NS__text {
}



///*######################################################################
//#   primitives/constant
//#####################################################################

SPAN.__NS__constant {
  color: #0000FF;
}



///*######################################################################
//#   primitives/array
//#####################################################################

SPAN.__NS__array > SPAN {
    color: #9C9C9C;
    font-weight: bold;
}

SPAN.__NS__array > SPAN.collapsed {
    color: #0000FF;
    font-weight: normal;
    padding-left: 5px;
    padding-right: 5px;
}

SPAN.__NS__array > SPAN.summary {
    color: #0000FF;
    font-weight: normal;
    padding-left: 5px;
    padding-right: 5px;
}

SPAN.__NS__array > DIV.element {
    display: block;
    padding-left: 20px;
}

SPAN.__NS__array > SPAN.element {
    padding-left: 2px;
}

SPAN.__NS__array > DIV.element.expandable {
    background-image: url(__RESOURCE__images/twisty-closed.png);
    background-repeat: no-repeat;
    background-position: 6px 2px;
    cursor: pointer;
}
SPAN.__NS__array > DIV.element.expandable.expanded {
    background-image: url(__RESOURCE__images/twisty-open.png);
}

SPAN.__NS__array > .element > SPAN.value {
}

SPAN.__NS__array > .element > SPAN.separator {
    color: #9C9C9C;
}



///*######################################################################
//#   primitives/map
//#####################################################################

SPAN.__NS__map > SPAN {
    color: #9C9C9C;
    font-weight: bold;
}

SPAN.__NS__map > DIV.pair {
    display: block;
    padding-left: 20px;
}

SPAN.__NS__map > SPAN.pair {
    padding-left: 2px;
}

SPAN.__NS__map > .pair > SPAN.delimiter,
SPAN.__NS__map > .pair > SPAN.separator {
    color: #9C9C9C;
    padding-left: 2px;
    padding-right: 2px;
}




///*######################################################################
//#   primitives/reference
//#####################################################################

SPAN.__NS__reference {
}



///*######################################################################
//#   primitives/dictionary
//#####################################################################


SPAN.__NS__dictionary > SPAN {
    color: #9C9C9C;
}

SPAN.__NS__dictionary > SPAN.collapsed {
    color: #0000FF;
    font-weight: normal;
    padding-left: 5px;
    padding-right: 5px;
}

SPAN.__NS__dictionary > SPAN.summary {
    color: #0000FF;
    font-weight: normal;
    padding-left: 5px;
    padding-right: 5px;
}

SPAN.__NS__dictionary > SPAN.member {
    color: #9C9C9C;
}

SPAN.__NS__dictionary > DIV.member {
    display: block;
    padding-left: 20px;
}
SPAN.__NS__dictionary > DIV.member.expandable {
    background-image: url(__RESOURCE__images/twisty-closed.png);
    background-repeat: no-repeat;
    background-position: 6px 2px;
    cursor: pointer;
}
SPAN.__NS__dictionary > DIV.member.expandable.expanded {
    background-image: url(__RESOURCE__images/twisty-open.png);
}

SPAN.__NS__dictionary > .member > SPAN.name {
    color: #E59D07;
    font-weight: normal;
}

SPAN.__NS__dictionary > .member > SPAN.value {
    font-weight: normal;
}

SPAN.__NS__dictionary > .member > SPAN.delimiter,
SPAN.__NS__dictionary > .member > SPAN.separator,
SPAN.__NS__dictionary > .member SPAN.more {
    color: #9C9C9C;
    padding-left: 2px;
    padding-right: 2px;
}


///*######################################################################
//#   primitives/unknown
//#####################################################################


SPAN.__NS__unknown {
    color: #FFFFFF;
    background-color: red;
}


///*######################################################################
//#   structures/trace
//#####################################################################

SPAN.__NS__structures-trace {
    background-image: url(__RESOURCE__images/edit-rule.png);
    background-repeat: no-repeat;
    background-position: 4px 1px;
    padding-left: 25px;
    font-weight: bold;
}

DIV.__NS__structures-trace {
    padding: 0px;
    margin: 0px;
}

DIV.__NS__structures-trace TABLE {
  border-bottom: 1px solid #D7D7D7;
}

DIV.__NS__structures-trace TABLE TBODY TR TH,
DIV.__NS__structures-trace TABLE TBODY TR TD {
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
}

DIV.__NS__structures-trace TABLE TBODY TR TH.header-file {
  white-space:nowrap;
  font-weight: bold;
  text-align: left;
}

DIV.__NS__structures-trace TABLE TBODY TR TH.header-line {
  white-space:nowrap;
  font-weight: bold;
  text-align: right;
}
DIV.__NS__structures-trace TABLE TBODY TR TH.header-inst {
  white-space:nowrap;
  font-weight: bold;
  text-align: left;
}

DIV.__NS__structures-trace TABLE TBODY TR TD.cell-file {
  vertical-align: top;
  border: 1px solid #D7D7D7;
  border-bottom: 0px;
  border-right: 0px;
}
DIV.__NS__structures-trace TABLE TBODY TR TD.cell-line {
  white-space:nowrap;
  vertical-align: top;
  text-align: right;
  border:1px solid #D7D7D7;
  border-bottom: 0px;
  border-right: 0px;
}
DIV.__NS__structures-trace TABLE TBODY TR TD.cell-line:hover,
DIV.__NS__structures-trace TABLE TBODY TR TD.cell-file:hover {
    background-color: #ffc73d;
    cursor: pointer;    
}
DIV.__NS__structures-trace TABLE TBODY TR TD.cell-inst {
  vertical-align: top;
  padding-left: 10px;
  font-weight: bold;
  border:1px solid #D7D7D7;
  border-bottom: 0px;
}

DIV.__NS__structures-trace TABLE TBODY TR TD.cell-inst DIV.arg {
  font-weight: normal;
  padding-left: 3px;
  padding-right: 3px;
  display: inline-block;
}
DIV.__NS__structures-trace TABLE TBODY TR TD.cell-inst DIV.arg:hover {
    background-color: #ffc73d;
    cursor: pointer;    
}

DIV.__NS__structures-trace TABLE TBODY TR TD.cell-inst .separator {
    padding-left: 1px;
    padding-right: 3px;
}


///*######################################################################
//#   structures/table
//#####################################################################

SPAN.__NS__structures-table {
    background-image: url(__RESOURCE__images/table.png);
    background-repeat: no-repeat;
    background-position: 4px -1px;
    padding-left: 25px;
}

DIV.__NS__structures-table {
    padding: 0px;
    margin: 0px;
}

DIV.__NS__structures-table TABLE {
  border-bottom: 1px solid #D7D7D7;
  border-right: 1px solid #D7D7D7;
}

DIV.__NS__structures-table TABLE TBODY TR.hide {
  display: none;
}

DIV.__NS__structures-table TABLE TBODY TR TH.header {
  vertical-align: top;
  font-weight: bold;
  text-align: center;
  border: 1px solid #D7D7D7;
  border-bottom: 0px;
  border-right: 0px;
  background-color: #ececec;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
}

DIV.__NS__structures-table TABLE TBODY TR TD.cell {
  vertical-align: top;
  padding-right: 10px;
  border: 1px solid #D7D7D7;
  border-bottom: 0px;
  border-right: 0px;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
}

DIV.__NS__structures-table TABLE TBODY TR TD.cell:hover {
    background-color: #ffc73d;
    cursor: pointer;    
}


///*######################################################################
//#   util/trimmed
//#####################################################################

SPAN.__NS__util-trimmed {
    color: #FFFFFF;
    background-color: blue;
    padding-left: 5px;
    padding-right: 5px;
}



///*######################################################################
//#   @anchor wrappers/console
//#####################################################################

DIV.__NS__console-message {
    position: relative;
    margin: 0;
    border-bottom: 1px solid #D7D7D7;
    padding: 0px;
    background-color: #FFFFFF;
}
DIV.__NS__console-message.selected {
    background-color: #35FC03 !important;
}

DIV.__NS__console-message-group[expanded=true] {
    background-color: #77CDD9;
}

DIV.__NS__console-message > DIV.header {
    position: relative;
    padding-left: 34px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 4px;
    cursor: pointer;
}

DIV.__NS__console-message[expanded=true] > DIV.header {
    text-align: right;
    min-height: 16px;
}

DIV.__NS__console-message[expanded=false] > DIV.header:hover {
    background-color: #ffc73d;
}

DIV.__NS__console-message-group > DIV.header {
    background: url(__RESOURCE__images/document_page_next.png) no-repeat;
    background-position: 2px 3px;
    font-weight: bold;
    background-color: #77CDD9;
}

DIV.__NS__console-message > DIV.header-priority-info {
    background: url(__RESOURCE__images/information.png) no-repeat;
    background-position: 2px 3px;
    background-color: #c6eeff;
}

DIV.__NS__console-message > DIV.header-priority-warn {
    background: url(__RESOURCE__images/exclamation-diamond.png) no-repeat;
    background-position: 2px 3px;
    background-color: #ffe68d;
}

DIV.__NS__console-message > DIV.header-priority-error {
    background: url(__RESOURCE__images/exclamation-red.png) no-repeat;
    background-position: 2px 3px;
    background-color: #ffa7a7;
}

DIV.__NS__console-message > DIV.header > DIV.expander {
    background-color: black;
    width: 18px;
    height: 18px;
    display: inline-block;
    float: left;
    position: relative;
    top: -1px;
    margin-left: -14px;
}

DIV.__NS__console-message > DIV.header > DIV.expander:hover {
    cursor: pointer;
}

DIV.__NS__console-message[expanded=false] > DIV.header > DIV.expander {
    background: url(__RESOURCE__images/plus-small-white.png) no-repeat;
    background-position: 0px 1px;
}

DIV.__NS__console-message[expanded=true] > DIV.header > DIV.expander {
    background: url(__RESOURCE__images/minus-small-white.png) no-repeat;
    background-position: 0px 1px;
}

DIV.__NS__console-message > DIV.header > SPAN.summary > SPAN.label > SPAN,
DIV.__NS__console-message > DIV.header > SPAN.fileline > DIV > DIV.label {
    margin-right: 5px;
    background-color: rgba(69,68,60,1);
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    vertical-align: top;
    margin-top: 1px;
}
DIV.__NS__console-message > DIV.header > SPAN.fileline > DIV > DIV.label {
    float: left;
    margin-top: 0px;
}

DIV.__NS__console-message > DIV.header > SPAN.summary > SPAN > SPAN.count {
    color: #8c8c8c;
}

DIV.__NS__console-message > DIV.header > SPAN.fileline {
    color: #8c8c8c;
    word-wrap: break-word;
}

DIV.__NS__console-message[expanded=true] > DIV.header > SPAN.summary {
    display: none;
}

DIV.__NS__console-message[keeptitle=true] > DIV.header,
DIV.__NS__console-message-group > DIV.header {
    text-align: left !important;
}
DIV.__NS__console-message[keeptitle=true] > DIV.header > SPAN.fileline,
DIV.__NS__console-message-group > DIV.header > SPAN.fileline {
    display: none !important;
}
DIV.__NS__console-message[keeptitle=true] > DIV.header > SPAN.summary,
DIV.__NS__console-message-group > DIV.header > SPAN.summary {
    display: inline !important;
}
DIV.__NS__console-message-group > DIV.header > DIV.actions {
    display: none !important;
}
DIV.__NS__console-message-group > DIV.header > SPAN.summary > SPAN > SPAN.count {
    color: #ffffff !important;
}


DIV.__NS__console-message[expanded=false] > DIV.header > SPAN.fileline {
    display: none;
}

DIV.__NS__console-message > DIV.header > DIV.actions {
    display: inline-block;
    position: relative;
    top: 0px;
    left: 10px;
    float: right;
    margin-left: 0px;
    margin-right: 5px;
}

DIV.__NS__console-message > DIV.header > DIV.actions DIV.inspect {
    display: inline-block;
    background: url(__RESOURCE__images/node-magnifier.png) no-repeat;
    width: 16px;
    height: 16px;
    margin-right: 4px;
}
DIV.__NS__console-message > DIV.header > DIV.actions > DIV.file {
    display: inline-block;
    background: url(__RESOURCE__images/document-binary.png) no-repeat;
    width: 16px;
    height: 16px;
    margin-right: 4px;
}

DIV.__NS__console-message > DIV.header > DIV.actions > DIV.inspect:hover,
DIV.__NS__console-message > DIV.header > DIV.actions > DIV.file:hover {
    cursor: pointer;
}

DIV.__NS__console-message > DIV.body {
    padding: 6px;
    margin: 3px;
    margin-top: 0px;
}

DIV.__NS__console-message[expanded=false] > DIV.body {
    display: none;
}

DIV.__NS__console-message-group > DIV.body {
    padding: 0px;
    margin: 0px;
    margin-left: 20px;
    border-top: 1px solid #000000;
    border-left: 1px solid #000000;
    margin-bottom: -1px;
}

DIV.__NS__console-message > DIV.body-priority-info {
    border: 3px solid #c6eeff;
    margin: 0px;
    border-top: 0px;
}

DIV.__NS__console-message > DIV.body-priority-warn {
    border: 3px solid #ffe68d;
    margin: 0px;
    border-top: 0px;
}

DIV.__NS__console-message > DIV.body-priority-error {
    border: 3px solid #ffa7a7;
    margin: 0px;
    border-top: 0px;
}

DIV.__NS__console-message > DIV.body > DIV.group-no-messages {
    background-color: white;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 3px;
    padding-bottom: 3px;
    color: gray;
}

DIV.__NS__console-message .hidden {
    display: none !important;
}


///*######################################################################
//#   wrappers/viewer
//#####################################################################

DIV.__NS__viewer-harness {
    padding: 2px 4px 1px 6px;
    font-family: Lucida Grande, Tahoma, sans-serif;
    font-size: 11px;
}


///*######################################################################
//#   firebug console
//#####################################################################

DIV.devcomp-request-group {
  background: url(__RESOURCE__images/firebug_request_group_bg.png) repeat-x #FFFFFF;
}

DIV.devcomp-request-group > DIV.logGroupLabel {
  min-height: 16px !important;
  background: url(__RESOURCE__images/devcomp_16.png) !important;
  background-repeat: no-repeat !important;
  background-position: 3px 1px !important;
  padding-left: 24px !important;
}

DIV.devcomp-request-group > DIV.logGroupLabel > SPAN.objectBox {
  color: #445777;
  font-family: Lucida Grande, Tahoma, sans-serif;
  font-size: 11px;
}

DIV.devcomp-request-group > DIV.logGroupBody > DIV > DIV.title > DIV.actions > DIV {
    display: none !important;
}


*/}
