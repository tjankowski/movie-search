import fetch from "isomorphic-unfetch";
import { notFound, success, toMany } from "./mocks";
import { byId, search } from "./omdb";

jest.mock("isomorphic-unfetch");

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const URL = process.env.NEXT_PUBLIC_API_URL;

const VALID_RESPONSE = { Response: "true", Title: "Titanic" };
const ID = "1234";
const QUERY = "Titanic";

describe("omdb", () => {
  describe("byId", () => {
    it("should build correct URL", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(VALID_RESPONSE),
      });
      await byId(ID);
      expect(fetch).toHaveBeenCalledWith(
        `${URL}/?i=${ID}&plot=full&apikey=${TOKEN}`
      );
    });

    it("should return response from server", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(VALID_RESPONSE),
      });
      const result = await byId(ID);
      expect(result.Title).toEqual("Titanic");
    });

    it("should return 404 error", async () => {
      fetch.mockResolvedValue({
        json: () =>
          Promise.resolve({ Response: "false", Error: "Incorrect IMDb ID." }),
      });
      try {
        await byId(ID);
      } catch (error) {
        expect(error.name).toEqual(404);
      }
    });

    it("should return server error", async () => {
      fetch.mockRejectedValue({});
      try {
        await byId(ID);
      } catch (error) {
        expect(error.message).toEqual(
          "We couldn't load data from the server. Please try again later."
        );
      }
    });
  });

  describe("search", () => {
    it("should build correct URL given query", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(success),
      });
      await search(QUERY);
      expect(fetch).toHaveBeenCalledWith(
        `${URL}/?s=${QUERY}&page=1&apikey=${TOKEN}`
      );
    });
    it("should build correct URL given query and page", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(success),
      });
      await search(QUERY, 4);
      expect(fetch).toHaveBeenCalledWith(
        `${URL}/?s=${QUERY}&page=4&apikey=${TOKEN}`
      );
    });

    it("should build correct URL given query and page", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(success),
      });
      const result = await search(QUERY);
      expect(result).toEqual({
        query: QUERY,
        page: 1,
        results: success.Search,
        totalResults: parseInt(success.totalResults),
        totalPages: Math.ceil(parseInt(success.totalResults) / 10),
      });
    });

    it("totalPages shouldnt be bigger than 100", async () => {
      const response = { ...success, totalResults: "1001" };
      fetch.mockResolvedValue({
        json: () => Promise.resolve(response),
      });
      const result = await search(QUERY);
      expect(result).toEqual({
        query: QUERY,
        page: 1,
        results: response.Search,
        totalResults: parseInt(response.totalResults),
        totalPages: 100,
      });
    });

    it("should return empty results", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(notFound),
      });
      const result = await search(QUERY);
      expect(result).toEqual({
        query: QUERY,
        page: 1,
        results: [],
        totalResults: 0,
        totalPages: 0,
      });
    });
    it("should throw error for too many results", async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve(toMany),
      });
      try {
        await search(QUERY);
      } catch (error) {
        expect(error.message).toEqual(
          "Too many results. Please try more specific query."
        );
      }
    });
    it("should return server error", async () => {
      fetch.mockRejectedValue({});
      try {
        await search(QUERY);
      } catch (error) {
        expect(error.message).toEqual(
          "We couldn't load data from the server. Please try again later."
        );
      }
    });
  });
});
