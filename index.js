const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "turnament-app-3021a",
  "private_key_id": "725c96a45c79f869db07582a0ab09ef2359f8c4d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDlY181pHsIfmt/\nSMj7jZTwUydNM+aVGAzD+d7BCdFXhK8KD1hyfWCK77dkRmMAJZXK7IdcKwtMIEru\nqA7IrX06jTyOS8CxF+2JOO+fIbuBN2IUvUJ+vTGNRf80RFUbuzHgAIJ+zIzmkV1R\FMTctSMuqfVvnXPu6BqVrq7S/zcAvkFucESGamCuKkD52IKgA7eWcS++wGB0DZj1\nLIPVsXUziM0JdmNvO3w/udDdLZYqCgM/VnehTg+M0jLsfvA4v1pevCFnUL/h/FYZ\nflgViKoHVeoC1MOLpZFCU5FyW2oMwOpjWjjIhoFihWXXdP/RWXB8YTykE7q9QERl\n6iMYtRdNAgMBAAECggEAbVMrhNLj6lvqGstTMoS7V8Chygsy2ZsRNnPHpOPreFUd\n4WMH6eT0VrNCCdH8DA1ds02Ag75mD32SiOTiyuTYesfmdQEIkL6RMKXImmSGy2Jc\nZfr/jozX6XdTVpM8ps9USWikyQ7vFlJwkZye6HuSDYLmHTCDGPlY9j6/RoNpMPoV\nExouVFsiYuP9jguzPgyzlTZfwdK4wuuP7GA7ah9QW9vFv6Rs64xmFHarCvvfcMQ/\nhFYVWIhTsqdtgEZIDFf1SwKPDWgMlMKBIrF89YmYeeMo/Zd6WFqyw1XxkiYmAiew\4WSTiExQL3kHO+FI12Gd/fTpiveqw67ZjBXnQFmhFwKBgQDyrmF4c9lL0p7NGaR+\nOIv7yU7OXiD5eypoNgkdqb8EgrB5VTKXZk/R79jNkaaGZmsyvzFVPjYAZ12XtXTA\ng3zGGiTQyp9d4UufUmKYfku9eVJ4/CmrBKBbezoaAuVVHbcMsuWSjh+3FyU0TCk0\n9YhH+Vx2+BEYrfrITSoOjMUURwKBgQDx+jou/6zSu0YT1o3oxvwwamaXpnDmstMp\nApMApv0ULzs7a3+tTMCwK1OaHRoGnb6rlKizPk8B/vH7/hMngLT0QrDYWfv6utBk\ngyIgtsSOd9iX7kK+eG5WABKel2HrDKMSFPoGRlYVKcQbIO51OY056EcYP43bkpqv\YDqFyiJlywKBgQDK0o0p84C3ixcniXfd+fqce9m+RhM/Dv4ZTJf/z5+S8Hr3XQpE\nWMD7T36eCE3p4+1R41Mi0DSnz7v8EC68uufsVWtRiRb6ilH+nQdENcGtYJlZ/j4A\n7YPsESg1Fxh+M7CKD3YpL1k4V0LD26dQ2KiGptTtpVP8kWOYRk2RDXuk/wKBgQCF\n2M60TpKvIg3aTVTDzMWUllZXTianRYVN6vGba8MTliiiboz6NDlleSHOXoiV3k2o\npRtHwpB7XyVFKT45HJV7gyRFGEksYIeDAZIwHEjPMXWqXI2ow/7sLTAfb0cneB7/\nkoDWVbOqEyc5hlbAmuwGevhQbl8udIKBva3BcZTjTwKBgQCLc/BPj61ZeGoHmYUB\nf1OEU9NLQBXFNWzIK2AquCpMrXhxHKhp2RfmzZY61h2wNG2kEecmX40/mNNREtaE\nCdrjXvMGbgPYYu67USDLOIiAe434T8WB/xIe+iy30sjzUStZUUVXRAFl2O2ZZsuC\nlHb21O4LXblHJO2C1kWttG9Hww==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@turnament-app-3021a.iam.gserviceaccount.com",
  "client_id": "103459828711638996012",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40turnament-app-3021a.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

app.post('/send-notification', async (req, res) => {
    const { title, body } = req.body;
    
    const message = {
        notification: {
            title: title || "Revenge Battle",
            body: body || ""
        },
        topic: "RevengeBattleAll"
    };

    try {
        await admin.messaging().send(message);
        res.status(200).send({ success: true, message: "Sent!" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
