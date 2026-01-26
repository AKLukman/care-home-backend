export const getStartOfToday = () => {
    const date = new Date();
    date.setHours( 0, 0, 0, 0 );
    return date;
};
