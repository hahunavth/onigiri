import { Platform } from "react-native";
import * as Sentry from "@sentry/react-native";
import * as Device from "expo-device";

const onigiriSentryReleaseName = () => {
  const prefix = Platform.OS === "ios" ? "ios" : "android";
  const buildNumber = Device.modelName;
  const version = Device.osVersion;
  return prefix + "-" + version + "-" + buildNumber;
};

// FIXME: CAUSE ERROR
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export default function setupSentry() {
  console.log(process.env.SENTRY_DSN);
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableNative: false,
    integrations: [
      new Sentry.ReactNativeTracing({
        // routingInstrumentation,
        tracingOrigins: ["localhost", "my-site-url.com", /^\//]
      })
    ],
    // debug: true,
    // To set a uniform sample rate
    tracesSampleRate: 0.2,
    //
    enableAutoSessionTracking: true,
    // Sessions close after app is 10 seconds in the background.
    sessionTrackingIntervalMillis: 10000,
    // NOTE: eigen config
    release: onigiriSentryReleaseName(),
    dist: Device.osVersion || undefined,
    autoSessionTracking: true,
    enableOutOfMemoryTracking: false
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
