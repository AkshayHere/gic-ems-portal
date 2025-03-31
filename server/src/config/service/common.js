class Common {
  defineConsoleLogs(message) {
    console.log(`${new Date().toISOString()} - `, message);
  }

  generateEmployeeId(latestEmployeeId = 1) {
    const zeroPad = (num, places) => String(num).padStart(places, "0");
    const latestCount = latestEmployeeId.toString().replace("UI", "");
    const finalCount = Number(latestCount) + 1;
    return `UI${zeroPad(finalCount, 7)}`; 
  }

  calculateDaysWorked(created_at) {
    const now = new Date();
    const createdAt = new Date(created_at);
    const timeDiff = Math.abs(now.getTime() - createdAt.getTime());
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  verifyPageAndLimit(page = 1, limit = 5) {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }

    if (page <= 0) {
      return {
        page,
        limit,
        success: false,
        message: "Page value must be 1 or more",
        data: null,
      };
    }

    if (limit <= 0) {
      return {
        page,
        limit,
        success: false,
        message: "Limit value must be 1 or more",
        data: null,
      };
    }

    return {
      page,
      limit,
      success: true,
    };
  }
}

module.exports = new Common();
