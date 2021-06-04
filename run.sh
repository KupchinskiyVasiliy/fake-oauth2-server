#!/bin/bash

set -a
source .env
set +a

if [ ! -f sslcert/cert.key ] || [ ! -f sslcert/cert.pem ]; then
    echo "Generating certificate..."
    mkdir -p sslcert

    cat <<EOF > sslcert/openssl.conf
    [req]
    distinguished_name = req_distinguished_name
    x509_extensions = v3_req
    prompt = no
    [req_distinguished_name]
    C = US
    ST = VA
    L = SomeCity
    O = MyCompany
    OU = MyDivision
    CN = $DOMAIN_NAME
    [v3_req]
    keyUsage = critical, digitalSignature, keyAgreement
    extendedKeyUsage = serverAuth
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = www.$DOMAIN_NAME
    DNS.2 = $DOMAIN_NAME
EOF

    openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout sslcert/cert.key -out sslcert/cert.pem -config sslcert/openssl.conf -sha256
fi

echo "Start server..."
node server.js
