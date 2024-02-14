export const handleMoveUp = (data, item, keyExtractor) => {
    const newData = [...data];
    const itemKey = keyExtractor(item);
    const currentIndex = newData.findIndex((thisItem) => itemKey === keyExtractor(thisItem));
    if (currentIndex === 0) {
        return newData;
    }
    newData.splice(currentIndex - 1, 0, newData.splice(currentIndex, 1)[0]);
    return newData;
};
export const handleMoveDown = (data, item, keyExtractor) => {
    const newData = [...data];
    const itemKey = keyExtractor(item);
    const currentIndex = newData.findIndex((thisItem) => itemKey === keyExtractor(thisItem));
    if (currentIndex === newData.length - 1) {
        return newData;
    }
    newData.splice(currentIndex + 1, 0, newData.splice(currentIndex, 1)[0]);
    return newData;
};
//# sourceMappingURL=utils.js.map