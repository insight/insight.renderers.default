
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="string");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                VAR_wrapped: false,
        
                tag:
                    SPAN({"class": PACK.__NS__+"string", "wrapped": "$node.wrapped"},
                        IF("$node.wrapped", "'"),
                        FOR("line", "$node|getValue",
                            "$line.value",
                            IF("$line.special", SPAN({"class": "special"}, "$line.specialvalue")),
                            IF("$line.more", BR()),
                            IF("$line.trimmed", TAG("$node|getTrimmedTag", {"node": "$node"}))
                        ),
                        IF("$node.wrapped", "'")),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"string", "wrapped": "$node.wrapped"},
                        IF("$node.wrapped", "'"),
                        FOR("line", "$node|getShortValue",
                            "$line.value",
                            IF("$line.special", SPAN({"class": "special"}, "$line.specialvalue")),
                            IF("$line.more", BR()),
                            IF("$line.trimmed", TAG("$node|getTrimmedTag", {"node": "$node"}))
                        ),
                        IF("$node.wrapped", "'")),
        
                // TODO: Should be using the insight/util/trimmed tag but the tag is inclusion not working
                trimmedNoticeTag: 
                    SPAN({"class": "trimmed"},
                        "$node|getNotice"
                    ),
        
                getNotice: function(node) {
                    return node.meta["encoder.notice"];
                },
                        
                getTrimmedTag: function() {
                    return this.trimmedNoticeTag;
                },
        
                getValue: function(node) {
                    var parts = node.value.split("\n");
                    var lines = [];
                    for( var i=0,c=parts.length ; i<c ; i++ ) {
                        lines.push({
                            "value": parts[i],
                            "more": (i<c-1)?true:false,
                            "special": false
                        });
                    }
                    if(node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
                        lines.push({
                            "value": "",
                            "trimmed": true
                        });
                    }
                    return lines;
                },
                
                getShortValue: function(node) {
                    var meta = node.getObjectGraph().getMeta();

                    // TODO: This needs to be optimized

                    var trimEnabled = true;
                    var trimLength = 50;
                    var trimNewlines = true;
                    if(!node.parentNode) {
                        // if a top-level string display 500 chars (but trim newlines)
                        // but only if we are not asked to specifically trim
                        if(typeof meta["string.trim.enabled"] == "undefined" || !meta["string.trim.enabled"]) {
                            trimLength = 500;
                        }
                    }
                    if(typeof meta["string.trim.enabled"] != "undefined") {
                        trimEnabled = meta["string.trim.enabled"];
                    }
                    if(typeof meta["string.trim.length"] != "undefined" && meta["string.trim.length"]>=5) {
                        trimLength = meta["string.trim.length"];
                    }
                    if(typeof meta["string.trim.newlines"] != "undefined") {
                        trimNewlines = meta["string.trim.newlines"];
                    }
        
                    var str = node.value;
                    if(trimEnabled) {
                        if(trimLength>-1) {
                            str = cropString(str, trimLength);
                        }
                        if(trimNewlines) {
                            str = escapeNewLines(str);
                        }
                    }
        
                    var parts = str.split("\n");
                    var lines = [],
                        parts2;
                    for( var i=0,ci=parts.length ; i<ci ; i++ ) {
                        parts2 = parts[i].split("|:_!_:|");
                        for( var j=0,cj=parts2.length ; j<cj ; j++ ) {
                            if(parts2[j]=="STRING_CROP") {
                                lines.push({
                                    "value": "",
                                    "more": false,
                                    "special": true,
                                    "specialvalue": "..."
                                });
                            } else
                            if(parts2[j]=="STRING_NEWLINE") {
                                lines.push({
                                    "value": "",
                                    "more": false,
                                    "special": true,
                                    "specialvalue": "\\n"
                                });
                            } else {
                                lines.push({
                                    "value": parts2[j],
                                    "more": (i<ci-1 && j==cj-1)?true:false
                                });
                            }
                        }
                    }
                    if(node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
                        lines.push({
                            "value": "",
                            "trimmed": true
                        });
                    }
                    return lines;
                }
            });
        }        
    }
});

function cropString(value, limit) {
    limit = limit || 50;
    if (value.length > limit) {
        return value.substr(0, limit/2) + "|:_!_:|STRING_CROP|:_!_:|" + value.substr(value.length-limit/2);
    } else {
        return value;
    }
}

function escapeNewLines(value) {
    return (""+value).replace(/\r/g, "\\r").replace(/\n/g, "|:_!_:|STRING_NEWLINE|:_!_:|");
}
