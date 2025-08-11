export class QueryDbError extends Error {
    constructor(message, originalError) {
      super(message);
      this.name = "QueryDataError";
      this.originalError = originalError;
      this.statusCode = 602;
      this.errorCode = "QUERY_USGS_DATA_FAILED";
    }
}
