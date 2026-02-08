import { lazy } from "react";

const AboutUs = lazy(() => import("./About.tsx"));
const KeyManagement = lazy(() => import("./KeyManagement.tsx"));
const Encrypt = lazy(() => import("./Encrypt.tsx"));
const Decrypt = lazy(() => import("./Decrypt.tsx"));

export { Encrypt, Decrypt, AboutUs, KeyManagement };
