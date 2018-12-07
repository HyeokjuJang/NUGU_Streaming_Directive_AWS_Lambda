const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    
    try{
        var requestBody = JSON.parse(event.body);
    }catch(e){
        var requestBody = event.body;
    }
   
    var action = requestBody.action;
    var actionName = action.actionName;
    var parameters = action.parameters;
    
    // if type exist then play the entity exist
    // entity parameter name at nugu is type

    try{
        var type = parameters.type.value;
    }catch(e){
        var type = "no type";
    }
    
    if(type == null){
        type = "no entity";
    }
    try{
        var AudioPlayer = requestBody.context.supportedInterfaces.AudioPlayer;
    }catch(e){
        var AudioPlayer = "";
    }

    if(AudioPlayer != ""){
        var playerActivity = AudioPlayer.playerActivity;
        var token = AudioPlayer.token;
        var offsetInMilliseconds = AudioPlayer.offsetInMilliseconds;
    }else{
        var offsetInMilliseconds = 0;
        var token = "";
        var playerActivity = "";
    }
    
    // Basic url and theme
    var url = "https://s3.주소/index.m3u8";
    var theme = "response parameter";
    
    if(actionName=="play"){
        url = "https://s3.주소/index.m3u8";
        theme = "response parameter";
        token = "token";
        callbackResponseBasic(theme,url,0,token,callback);
    }else if(actionName=="pause"){
        url = "https://s3.주소/index.m3u8";
        callbackResponsePause(url,offsetInMilliseconds,token,callback);
    }else if(actionName=="rewind"){
        url = "https://s3.주소index.m3u8";
        callbackResponseBuiltIn(url,0,token,callback);
    }else{ // (type == "no entity" && token != "") // Built in event play
        callbackResponseBuiltIn(url,offsetInMilliseconds,token,callback);
    }
};

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function callbackResponse(parameters,url,offsetInMilliseconds,token,callback){
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                  "type": parameters.type.value,
                },
                "directives": [
                  {
                    "type": "AudioPlayer.Play",
                    "audioItem": {     
                        "stream": {
                            "url": url,
                            "offsetInMilliseconds": offsetInMilliseconds,
                            "progressReport": {
                                "progressReportDelayInMilliseconds": 0,
                                "progressReportIntervalInMilliseconds": 0
                            },
                            "token": token,
                            "expectedPreviousToken": "anything"
                        },
                        "metadata": { } // reserved
                    }
                  }
                ]
            })
    });
}

function callbackResponseBasic(theme,url,offsetInMilliseconds,token,callback){
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                  "theme": theme,
                },
                "directives": [
                  {
                    "type": "AudioPlayer.Play",
                    "audioItem": {     
                        "stream": {
                            "url": url,
                            "offsetInMilliseconds": offsetInMilliseconds,
                            "progressReport": {
                                "progressReportDelayInMilliseconds": 0,
                                "progressReportIntervalInMilliseconds": 0
                            },
                            "token": token,
                            "expectedPreviousToken": "anything"
                        },
                        "metadata": { } // reserved
                    }
                  }
                ]
            })
    });
}

function callbackResponseBuiltIn(url,offsetInMilliseconds,token,callback){
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                  
                },
                "directives": [
                  {
                    "type": "AudioPlayer.Play",
                    "audioItem": {     
                        "stream": {
                            "url": url,
                            "offsetInMilliseconds": offsetInMilliseconds,
                            "progressReport": {
                                "progressReportDelayInMilliseconds": 0,
                                "progressReportIntervalInMilliseconds": 0
                            },
                            "token": token,
                            "expectedPreviousToken": "anything"
                        },
                        "metadata": { } // reserved
                    }
                  }
                ]
            })
    });
}
function callbackResponsePause(url,offsetInMilliseconds,token,callback){
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                  
                },
                "directives": [
                  {
                    "type": "AudioPlayer.Pause",
                    "audioItem": {     
                        "stream": {
                            "url": url,
                            "offsetInMilliseconds": offsetInMilliseconds,
                            "progressReport": {
                                "progressReportDelayInMilliseconds": 0,
                                "progressReportIntervalInMilliseconds": 0
                            },
                            "token": token,
                            "expectedPreviousToken": "anything"
                        },
                        "metadata": { } // reserved
                    }
                  }
                ]
            })
    });
}