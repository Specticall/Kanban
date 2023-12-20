import { BASE_URL, STATICDB_FETCH_TIME_SECONDS } from "../config/config";
import { db } from "../db/db";
import { BoardData, ErrorMessage } from "../types/generalTypes";

export class JSONServer {
  async getData(): Promise<BoardData[] | ErrorMessage> {
    try {
      const response = await fetch(`${BASE_URL}/boards`);

      if (!response.ok) throw new Error("Something went wrong while fetching");

      const data: BoardData[] = await response.json();

      return data;
    } catch (error) {
      const errorMessage: ErrorMessage =
        error instanceof Error ? error.message : "An Error Occured";
      return errorMessage;
    }
  }
}

/**
 * Class to simulate data fetching. This is to avoid having to host APIs for JSON data. the actual db data is just a JSON object that gets parsed manually.
 */
export class StaticDB {
  async getData(): Promise<BoardData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { boards: data } = db;
        resolve(data);
      }, STATICDB_FETCH_TIME_SECONDS * 1000);
    });
  }
}
