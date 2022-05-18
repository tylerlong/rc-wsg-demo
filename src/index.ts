import {SDK} from '@ringcentral/sdk';
import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';
import RcSdkExtension from '@rc-ex/rcsdk';

const rcSdk = new SDK({
  server: SDK.server.sandbox,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rcSdk.login({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD,
  });

  // Setup WSG subscription
  const rc = new RingCentral();
  const rcSdkExtension = new RcSdkExtension({rcSdk: rcSdk});
  await rc.installExtension(rcSdkExtension);
  const webSocketExtension = new WebSocketExtension();
  await rc.installExtension(webSocketExtension);
  await webSocketExtension.subscribe(
    ['/restapi/v1.0/account/~/extension/~/presence'],
    event => {
      console.log(JSON.stringify(event, null, 2));
    }
  );

  // trigger a notification
  await rcSdk.platform().put('/restapi/v1.0/account/~/extension/~/presence', {
    userStatus: 'Busy',
    message: 'Hello world',
  });
};

main();
