const detect = (x, y, dir, map) => {
    y = Math.floor(y / 10);
    x = Math.floor(x / 10);
    if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
        return true;
    }
    const row = map[y].split('');
    const pos = Number(row[x]);
    let pos2, pos3;

    switch (dir) {
        case 'up':
        case 'down':
            pos2 = Number(row[x - 1]);
            pos3 = Number(row[x + 1]);
            break;
        case 'right':
        case 'left':
            let row2 = map[y - 1];
            row2 = row2.split('');
            let row3 = map[y + 1];
            row3 = row3.split('');
            pos2 = Number(row2[x]);
            pos3 = Number(row3[x]);
            break;
    }

    return !!pos || !!pos2 || !!pos3;
};

const mapBoundary = {
    detect: detect
};

export default mapBoundary;
