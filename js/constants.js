window._base_url = {
    lfc_sso_api : "https://hek4dbgaaa.execute-api.ap-southeast-1.amazonaws.com/prod",
}

window._globalContants = {
    lfc_sso_auth_url: "https://login.lloydsfinancingph.com/login?client_id=21nltku4iq30nu3d02gdqrde20&response_type=token&scope=email+openid+profile&redirect_uri=",
    lfc_sso_default_redirect_uri: "https://sso.lloydsfinancingph.com/",
    
    lfc_sso_auth_logout_url: "https://login.lloydsfinancingph.com/logout?client_id=21nltku4iq30nu3d02gdqrde20&logout_uri=",
    lfc_sso_default_logout_uri: "https://sso.lloydsfinancingph.com",
    
    
    lfc_sso_verify_account : _base_url.lfc_sso_api + '/getVerifyAccount'
}

