import { useEffect } from "react";
import { createDatabase } from "./src/database";
import {Routes} from "./src/routes";
import {SQLiteProvider} from 'expo-sqlite'

export default function App() {
  useEffect(() => {
    async function open() {
      await createDatabase();
    }
    open();
  })
  return (
    <SQLiteProvider databaseName="brasilapp">
      <Routes />
    </SQLiteProvider>
  );
}