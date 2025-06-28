import "../i18n";
import { Stack, useRouter, useSegments } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "../store";
import { useEffect, useState } from "react";

function AuthGate({ children }: { children: React.ReactNode }) {
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const segments = useSegments();
  const router = useRouter();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (segments.length > 0) {
      setReady(true);
    }
  }, [segments]);

  useEffect(() => {
    if (!ready) return;

    const inAuthGroup = segments[0] === "login";

    if (!loggedIn && !inAuthGroup) {
      router.replace("/login");
    }

    if (loggedIn && inAuthGroup) {
    router.replace("/(tabs)" as any);
    }
  }, [ready, loggedIn, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthGate>
        <Stack />
      </AuthGate>
    </Provider>
  );
}
