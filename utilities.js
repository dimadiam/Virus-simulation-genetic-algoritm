function rnd(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand === -0 ? 0 : rand;
}
function formatNumber(n) {
    n = n + '';
    var res = [], i = n.length - 3, v = n.length % 3;

    if(v === 0) {
        while(1) {
            if(i < -2) break;
            res.push( n.substr(i, 3) );
            i -= 3;
        }
    } else if(v === 1) {
        i = n.length - 3;
        while(1) {
            if(i < -1) break;
            res.push( n.substr(i, 3) );
            i -= 3;
        }
        res.push(n[0]);
    } else if(v === 2) {
        i = n.length - 3;
        while(1) {
            if(i < 0) break;
            res.push( n.substr(i, 3) );
            i -= 3;
        }
        res.push(n.substr(0, 2));
    }
    res = res.reverse();
    return res.join(' ');
}