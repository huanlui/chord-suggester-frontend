let lastId = 0;

 const newId = (prefix='id') => {
    lastId++;
    return `${prefix}${lastId}`;
}

export default newId;