import { Platform } from "react-native";
// import * as Sentry from "@sentry/react-native";
import * as Device from "expo-device";

import * as Sentry from "sentry-expo";
// const loadSentry = Platform.select({
//   native: () => require("sentry-expo"),
//   web: () => require("@sentry/nextjs")
// });
// const Sentry = loadSentry && loadSentry();

const onigiriSentryReleaseName = () => {
  const prefix = Platform.OS === "ios" ? "ios" : "android";
  const buildNumber = Device.modelName;
  const version = Device.osVersion;
  return prefix + "-" + version + "-" + buildNumber;
};

// FIXME: CAUSE ERROR
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

export { routingInstrumentation };
export default function setupSentry() {
  console.log(process.env.SENTRY_DSN);
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // enableNative: false,
    enabled: true,
    enableAutoPerformanceTracking: true,
    enableNativeCrashHandling: true, // This only works if enableNative is true
    enableAutoSessionTracking: true,
    enableNativeNagger: true,
    enableNdkScopeSync: true,
    enableInExpoDevelopment: true,
    integrations: [
      new Sentry.Native.ReactNativeTracing({
        routingInstrumentation,
        idleTimeout: 5000,
        tracingOrigins: ["localhost", /^\//, /^https:\/\//]
      })
    ],
    debug: true,
    // To set a uniform sample rate
    tracesSampleRate: 1,
    sampleRate: 1,
    //
    // enableAutoSessionTracking: true,
    // Sessions close after app is 10 seconds in the background.
    sessionTrackingIntervalMillis: 10000,
    // NOTE: eigen config
    release: onigiriSentryReleaseName(),
    dist: Device.osVersion || undefined,
    autoSessionTracking: true,
    enableOutOfMemoryTracking: true

    // beforeSend(event) {
    //   // exclude all events that have no stack trace
    //   if (event.stacktrace?.frames?.length) {
    //     return event
    //   } else {
    //     return null
    //   }
    // }
  });
}
