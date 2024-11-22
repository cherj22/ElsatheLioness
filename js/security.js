/*global _globalConstants*/
/*global $*/
var lfc_sso_url = _globalContants.lfc_sso_auth_url + _globalContants.lfc_sso_default_redirect_uri;
// window.location.replace(lfc_sso_url);
// console.log(lfc_sso_url)
retrieveCredentials()
function retrieveCredentials() {
    readURLParams();
    
    var _lfcssocreds = window.localStorage.getItem("lfcssocreds");
    _lfcssocreds = JSON.parse(_lfcssocreds);
    var _lfcssoidentity = window.localStorage.getItem("lfcssoidentity");
    _lfcssoidentity = JSON.parse(_lfcssoidentity);
    if (_lfcssocreds == undefined || _lfcssoidentity == undefined) {
        
        window.location.replace(lfc_sso_url);
    }
    else {
        if(_lfcssoidentity.identities != undefined){
            $('.email-username').text(_lfcssoidentity.name)
        }
        else{
            $('.email-username').text(_lfcssoidentity["cognito:username"])
        }
        
        //console.log(_lfcssoidentity.name)
        //Check if token has not yet expired.
        var expTime = _lfcssoidentity.exp * 1000;
        var timeNow = new Date().getTime();

        if (timeNow > expTime) {
            console.log("Token expired.. redirecting");
            //redirect to login page.
            window.location.replace(lfc_sso_url);
        }
    }
    console.log("_lfcssocreds",_lfcssocreds)
    console.log("lfc_identity",_lfcssoidentity)
    // console.log("username",_lfcssoidentity["cognito:username"])
    // console.log('Identity')
    // console.log(_lfcssoidentity)
    // console.log('Creds')
    // console.log(_lfcssocreds)
    
}


function readURLParams() {
    var queryString = window.location.search
    if (queryString == "" || queryString == undefined || queryString == null) {
        queryString = window.location.hash;
        // console.log("HASH=" + queryString);
        if (queryString.startsWith("#")) {
            queryString = queryString.slice(1);
        }
        // console.log("HASH2=" + queryString);
    }
    console.log(queryString)
    if (queryString != undefined && queryString != null) {
        var urlParams = new URLSearchParams(queryString);
        if (urlParams.has('access_token') && urlParams.has('id_token') && urlParams.has('token_type') && urlParams.has('expires_in')) {
            var vidToken = urlParams.get('id_token');
            var vExpiresIn = urlParams.get('expires_in');

            var parsedToken = parseJwt(vidToken);
            // console.log(JSON.stringify(parsedToken));
            // console.log("Saving credentials.");
            var timeNow = new Date().getTime();
            //save credentials
            var authCred = {
                AccessToken: urlParams.get('access_token'),
                IdToken: vidToken,
                TokenType: urlParams.get('token_type'),
                ExpiresIn: vExpiresIn,
                timestamp: timeNow
            }
            
            window.localStorage.setItem("lfcssocreds", JSON.stringify(authCred));
            window.localStorage.setItem("lfcssoidentity", JSON.stringify(parsedToken));
            window.localStorage.setItem("expires_in", urlParams.get('expires_in'));
            window.localStorage.setItem("id_token", urlParams.get('id_token'));
            window.localStorage.setItem("access_token", urlParams.get('access_token'));
            window.localStorage.setItem("token_type", urlParams.get('token_type'));
        }
        //console.log("urlParams",urlParams)
    }
}
readURLParams();
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
