import RingCentral from '@rc-ex/core';
import {SDK} from '@ringcentral/sdk';
import WebSocketExtension from '@rc-ex/ws';

const rcsdk = new SDK({
  server: SDK.server.sandbox,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rcsdk.login({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD,
  });
  const r = await rcsdk.platform().get('/restapi/v1.0/account/~/extension/~');
  console.log(JSON.stringify(await r.json(), null, 2));
};

main();
