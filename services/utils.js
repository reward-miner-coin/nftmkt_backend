export const returnedOneRow = async (row) => {
    var result = new Object();
    row.rows.map((media) => {
      result = media;
    });

    return result;
};

export const returnedManyRows = async (data) => {
    var result = new Array();
    data.rows.map((item) => {
        var obj = new Object();
    
        data.rowDescription.columns.map((el, i) => {
          obj[el.name] = item[i];
        });
        result.push(obj);
    });
    return result;
}

export const isFilledObject = async (data) => {
  return Object.keys(data).length != 0 && data.constructor === Object;
}

