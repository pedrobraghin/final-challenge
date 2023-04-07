export class PaginationUtils {
  static calculateOffsets(limit: number, itemsCount: number) {
    const offset = Math.ceil(itemsCount / limit);

    if (!limit || !itemsCount) {
      return 0;
    }

    if (!isFinite(offset)) {
      return 0;
    }

    return offset;
  }

  static validatePagination(limit: number, offset: number) {
    return !(limit < 0 || offset < 0);
  }
}
