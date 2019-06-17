function rnd(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand === -0 ? 0 : rand;
}

function formatNumber(n) {
    var res = (n + '').split(''),
        temp = [];

    res.reverse();
    res = res.join('');

    for (var i = 0; i < res.length; i+=3) {
         temp.push( res.substr(i, 3) );
     }

     temp = temp.join(' ');
     temp = temp.split('');
     temp = temp.reverse();
     temp = temp.join('');

    return temp;
}
