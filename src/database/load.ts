import { db } from "../worker/instances/web-worker";

export const loadDB = () => db.load();
