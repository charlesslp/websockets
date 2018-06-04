
const CERTIFICATE_PATH = {
    caBundle: "../../carlosmp_com.ca-bundle",
    clavePrivada: "../../clave_carlosmp_com.key",
    certificado: "../../carlosmp_com.crt"
};

const URL_CONFIG = {
    protocol: "https",
    domain: "carlosmp.com",
    port: 4001
};

const HOME_URL = URL_CONFIG.protocol + "://" + URL_CONFIG.domain + (URL_CONFIG.port ? ":" + URL_CONFIG.port : "");
