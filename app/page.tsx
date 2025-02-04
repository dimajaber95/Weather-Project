import Image from "next/image";
import styles from "./page.module.css";
import Dashboard from "./dashboard/Dashboard";
import WeatherWidget from "./dashboard/Dashboard-test";

export default function Home() {
  return (
    <div>
      <main>
        {/* <Dashboard /> */}
        <WeatherWidget />
      </main>
    </div>
  );
}
