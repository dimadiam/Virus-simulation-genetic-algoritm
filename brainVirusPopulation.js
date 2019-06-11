class BrainVirusPopulation {
    constructor (arrCountries, numbStartCountry, startPopulation, maxPopulation, virusOptions) {
        this.arrCountries = arrCountries;
        this.startCountry = this.arrCountries[numbStartCountry-1];
        this.startPopulation = startPopulation;
        this.maxPopulation = maxPopulation;
        this.arrVirus = [];
        while (startPopulation--) {
            this.arrVirus[startPopulation] = new Virus(70, 100, virusOptions.min, virusOptions.max, this.startCountry);//123
        }
        this.alive = true;
    }
    show(k) {
        console.log(`Текущая популяция вирусов в мире ${ formatNumber(k) }`);
    }
    infectionCountry() {
        var qty = this.arrVirus.length,
            indexLastVirus = qty - 1,
            indexLastCountry = this.arrCountries.length - 1,
            temp;
        qty = rnd(qty*0.2, qty*0.5);
        while (qty-- > 0) {
            temp = this.arrVirus[rnd(0, indexLastVirus)];
            temp.country = this.arrCountries[rnd(0, indexLastCountry)];
        }
    }
    get() {
        return this.arrVirus;
    }
    nextDay(day) {
        var qty = this.arrVirus.length - 1;
        var qtyHealthyPeopleObj = {}, key;
        while(qty-- > 0) {
            if(this.arrVirus[qty].alive) {
                this.arrVirus[qty].nextDay();
            } else {
                key = this.arrVirus[qty].country.name;
                if(key in qtyHealthyPeopleObj) qtyHealthyPeopleObj[key]++;
                else qtyHealthyPeopleObj[key] = 1;

                this.arrVirus.splice(qty, 1);
            }
        }

        if(this.arrVirus.length < 2) this.alive = false;
        //123
        if(day % rnd(1, 5) === 0) this.crossoverPopulation();
        if(day % rnd(1, 5) === 0) this.infectionCountry();
        if(day % rnd(1, 3) === 0) this.mutation(rnd(10, 20));

        return qtyHealthyPeopleObj;
    }
    calcChance() {
        var qty = this.arrVirus.length - 1;
        while(qty-- > 0) this.arrVirus[qty].calcChance();
    }
    _crossover(a, b) {
        // одноточечное скрещивание -> берём случайное число k на промежутке от 0 и до длинны гена. Разбиваем ген в месте k и получаем 2 пары кусочков генов. Соединяем а1 с b2 и b1 с a2: получаем новых потомков.
        var pair = [
            a.toString(2),
            b.toString(2)
        ];
        pair = alignLengthBin(pair);
        var k = rnd(0, pair[0].length - 1);
        a = pair[0].substr(0, k) + pair[1].substr(k);
        b = pair[1].substr(0, k) + pair[0].substr(k);
        return [
            parseInt(a, 2),
            parseInt(b, 2)
        ];

        function alignLengthBin(arrBin) {
            var minI, delta;
            delta = arrBin[0].length - arrBin[1].length;
            if(delta > 0) {
                minI = 1;
            } else {
                minI = 0;
                delta *= -1;
            }
            while(delta-- > 0) arrBin[minI] = '0' + arrBin[minI];
            return arrBin;
        }
    }
    crossoverPopulation() {
        var qty = this.arrVirus.length, pair, i, j, qtyGens = this.arrVirus[0].gens.length, nameGen;
        qty = rnd(qty*0.2, qty*0.5);
        qty = qty%2 ? qty-1 : qty;
        for (i = 0; i < qty; i+=2) {
            if (this.arrVirus[i].country.name === this.arrVirus[i+1].country.name) {
                for (j = 0; j < qtyGens; j++) {
                    nameGen = this.arrVirus[i].gens[j];

                    pair = this._crossover(
                        this.arrVirus[i][nameGen],
                        this.arrVirus[i+1][nameGen]
                    );
                    this.arrVirus[i][nameGen] = pair[0];
                    this.arrVirus[i+1][nameGen] = pair[1];
                }
            }
        }
        return this.arrVirus;
    }
    mutation(percent) {
        // меняем 1 случайный ген (1 бит) у случайной особи (случайное число из arr)
        var qty = this.arrVirus.length - 1, tmpQty = percent / 100 * qty, i;
        while(tmpQty-- > 0) {
            i = rnd(0, qty);
            this.arrVirus[i].mutation();
        }
    }
}