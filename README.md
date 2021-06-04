# Fake OAuth2 server for testing purposes

## Building & running
- Install `node.js` and `npm` from https://nodejs.org/en/ (LTS version)
- Clone this repo
- Run `npm install`
- Start the server using `./run.sh` (using bash interpreter)

## OneVizion Configuration

Go to `SSO Providers` and click `Add`.

Fill next values:

| Field name | Value |
| --- | :---: |
| SSO Provider Type | OAuth2 |
| Name | OAuth2 fake |
| Enabled | Yes |
| SSO Provider Certificate Chain (X.509 PEM format) | Click `Setup` and paste content from `sslcert/cert.pem` |
| Login URL | http://dev2.vqs.net:8080/oauth2/login/ `fake` |
| Client ID | dummy-client-id |
| Client Secret | dummy-client-secret |
| User Authorization URL | https://dev2.vqs.net:8282/o/oauth2/v2/auth |
| User Authorization Response Type | code |
| Access Token retrieve method | Authorization code |
| Authorization Code Grant Type | authorization_code |
| Access Token Request URL | https://dev2.vqs.net:8282/oauth2/v4/token |
| Access Token Request Authentication scheme | Form Body |
| User Information retrieve method | User Information Service |
| User Information Service URL | https://dev2.vqs.net:8282/oauth2/v3/userinfo |
| User Information Grant Type | something |
| User Select SQL query | `select u.user_id from (select user_id from users where email = :email order by last_login_date desc) u where rownum = 1` |

`:email` parameter will always `gkovalev@onevizion.com`

Restart OneVizion server after changes!