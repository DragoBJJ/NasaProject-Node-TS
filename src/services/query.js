export const getPagination = ({ page, limit }) => {
    const pageNumber = Math.abs(Number(page)) || 1;
    const limitPage = Math.abs(Number(limit)) || 0;
    const skip = (pageNumber - 1) * limitPage;
    return {
        skip,
        limitPage,
    };
};
