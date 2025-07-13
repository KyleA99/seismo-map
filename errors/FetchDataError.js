export class FetchDataError extends Error {
    constructor(message, originalError) {
      super(message);
      this.name = "FetchDataError";
      this.originalError = originalError;
      this.statusCode = 500;
      this.errorCode = "FETCH_USGS_DATA_FAILED";
    }
}
