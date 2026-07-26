import AuthScreen from "@/components/home/AuthScreen";
import HomeScreen from "@/components/home/HomeScreen";

const user = false;

export default function Home() {
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}
