export class InsertDbError extends Error {
    constructor(message, originalError) {
      super(message);
      this.name = "InsertDataError";
      this.originalError = originalError;
      this.statusCode = 601;
      this.errorCode = "INSERT_USGS_DATA_FAILED";
    }
}
