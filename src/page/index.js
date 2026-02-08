import { lazy } from "react";

const AboutUs = lazy(() => import(/* webpackChunkName: "about" */ "./About"));
const KeyManagement = lazy(
  () => import(/* webpackChunkName: "keygen" */ "./KeyManagement"),
);
const Encrypt = lazy(
  () => import(/* webpackChunkName: "encrypt" */ "./encrypt"),
);
const Decrypt = lazy(
  () => import(/* webpackChunkName: "decrypt" */ "./decrypt"),
);

export { Encrypt, Decrypt, AboutUs, KeyManagement };
