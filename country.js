class Country {
    constructor(name, temper, chanceInfection, population, seasonIntervals={}, day = 1, year = 1) {
        this.seasons = {
            spring: seasonIntervals.spring,
            summer: seasonIntervals.summer,
            fall: seasonIntervals.fall,
            dayInYear: seasonIntervals.allDays
        };

        this.name = name;
        this.temper = temper;
        this.chance = chanceInfection;
        this.populationMax = population;
        this.populationHealthy = population;
        this.day = day;
        this.year = year;
        this.populationInfected = 0;
        this.season = this.calcSeason();
        this.todayTemp = 0;
        this.k = parseInt(this.populationMax*0.0001*rnd(1,5));
    }
    calcSeason() {
        for(let k in this.seasons) {
            if (this.day > this.seasons[k][0] && this.day <= this.seasons[k][1]) return k;
        }
        return 'winter';
    }
    calcYear() {
        if(this.day > this.seasons.dayInYear) {
            this.day %= this.seasons.dayInYear + 1;
            if(this.day === 1) this.year++;
            this.day++;
        }
    }
    checkDay(arrVirus) {
        if (this.day%28 === 0) this.season = this.calcSeason();
        if (this.day%365 === 0) this.calcYear();
        this.todayTemp = rnd(
            this.temper[this.season][0],
            this.temper[this.season][1]
        );
        var qty = arrVirus.length - 1;
        while(qty-- > 0) {
            if(this.name === arrVirus[qty].country.name) {
                if(this.todayTemp < arrVirus[qty].minTemp
                    || this.todayTemp > arrVirus[qty].maxTemp) {
                        arrVirus[qty].dead();
                    }
                // код заражения 
                var tmpChance = rnd(0, 0);
                if (this.populationHealthy - this.k > 0 && tmpChance < arrVirus[qty].chance) {
                    if(rnd(0, 1) === 1) {
                        arrVirus.push(
                            new Virus(arrVirus[qty].health-1, rnd(arrVirus[qty].chance, arrVirus[qty].chance),
                            this.season[0], this.season[1], this)
                        );
                    }
                    this.populationHealthy -= this.k;
                    this.populationInfected += this.k;
                }
            }
        }
        this.day++;
    }
    getHealthyPopulation() {
        return this.populationHealthy;
    }
    setHealthy(infectedPeople) {
        this.populationHealthy = this.populationMax - infectedPeople;
        this.populationInfected = infectedPeople;
    }
    show() {
        console.log(`В стране ${this.name} Год ${this.year} День ${this.day} Сезон ${this.season} Средняя температура сегодня ${this.todayTemp}`);
        console.log('Здоровые:', formatNumber(this.populationHealthy) );
        console.log('Заражённые:', formatNumber(this.populationInfected) );
        console.log('\n\n');
     }
}


// countries
let seasonIntervals = {
    spring: [59, 152],
    summer: [152, 244],
    fall: [244, 303],
    allDays: 365
};

let arrCountries = [
    new Country('Germany',
    {
    summer: [15, 25],
    fall: [-3, 8],
    winter: [-6, 2],
    spring: [0, 15]
    },
    40, 82438639, seasonIntervals),
    new Country('United Kingdom',
    {
    summer: [15, 27],
    fall: [-5, 10],
    winter: [-8, 5],
    spring: [0, 15]
    },
    30, 66959016, seasonIntervals),
    new Country('France',
    {
    summer: [15, 25],
    fall: [-3, 8],
    winter: [-14, 2],
    spring: [0, 15]
    },
    40, 65480710, seasonIntervals),
    new Country('Italy',
    {
    summer: [15, 26],
    fall: [-3, 8],
    winter: [-8, 5],
    spring: [0, 16]
    },
    30, 59216525, seasonIntervals),
    new Country('Spain',
    {
    summer: [16, 28],
    fall: [-3, 15],
    winter: [-7, 5],
    spring: [0, 18]
    },
    40, 46441049, seasonIntervals),
    new Country('Ukraine',
    {
    summer: [15, 30],
    fall: [-6, 10],
    winter: [-20, -2],
    spring: [-2, 18]
    },
    50, 43795220, seasonIntervals),
    new Country('Poland',
    {
    summer: [15, 25],
    fall: [-5, 10],
    winter: [-17, -1],
    spring: [-1, 15]
    },
    45, 38028278, seasonIntervals),
    new Country('Romania',
    {
    summer: [15, 28],
    fall: [-1, 10],
    winter: [-13, 2],
    spring: [0, 17]
    },
    55, 19483360, seasonIntervals),
    new Country('Netherlands',
    {
    summer: [14, 24],
    fall: [-5, 10],
    winter: [-18, -1],
    spring: [0, 16]
    },
    35, 17132908, seasonIntervals),
    new Country('Belgium',
    {
    summer: [14, 25],
    fall: [-2, 15],
    winter: [-9, 4],
    spring: [0, 14]
    },
    30, 11562784, seasonIntervals),
    new Country('Greece',
    {
    summer: [18, 35],
    fall: [0, 17],
    winter: [-7, 5],
    spring: [2, 20]
    },
    40, 11124603, seasonIntervals),
    new Country('Czechia',
    {
    summer: [15, 28],
    fall: [-2, 14],
    winter: [-10, 2],
    spring: [0, 12]
    },
    50, 10630589, seasonIntervals),
    new Country('Portugal',
    {
    summer: [15, 33],
    fall: [0, 16],
    winter: [-8, 2],
    spring: [0, 18]
    },
    45, 10254666, seasonIntervals),
    new Country('Sweden',
    {
    summer: [10, 20],
    fall: [-8, 8],
    winter: [-25, -5],
    spring: [-2, 8]
    },
    35, 10053135, seasonIntervals),
    new Country('Hungary',
    {
    summer: [10, 27],
    fall: [-2, 10],
    winter: [-16, 0],
    spring: [0, 10]
    },
    40, 9655361, seasonIntervals),
    new Country('Austria',
    {
    summer: [10, 25],
    fall: [-2, 10],
    winter: [-7, 2],
    spring: [0, 10]
    },
    38, 8766201, seasonIntervals),
    new Country('Bulgaria',
    {
    summer: [15, 35],
    fall: [-1, 14],
    winter: [-10, 3],
    spring: [0, 15]
    },
    46, 6988739, seasonIntervals),
    new Country('Denmark',
    {
    summer: [10, 26],
    fall: [-1, 9],
    winter: [-10, 2],
    spring: [0, 14]
    },
    38, 5775224, seasonIntervals),
    new Country('Finland',
    {
    summer: [10, 19],
    fall: [-6, 7],
    winter: [-27, -3],
    spring: [-5, 8]
    },
    35, 5561389, seasonIntervals),
    new Country('Slovakia',
    {
    summer: [10, 27],
    fall: [-2, 10],
    winter: [-12, 0],
    spring: [0, 10]
    },
    40, 5450987, seasonIntervals),
    new Country('Ireland',
    {
    summer: [10, 26],
    fall: [-2, 10],
    winter: [-12, 2],
    spring: [-1, 10]
    },
    40, 4847139, seasonIntervals),
    new Country('Croatia',
    {
    summer: [10, 27],
    fall: [-2, 10],
    winter: [-16, 0],
    spring: [0, 10]
    },
    39, 4140148, seasonIntervals),
    new Country('Lithuania',
    {
    summer: [15, 27],
    fall: [-2, 10],
    winter: [-12, 0],
    spring: [0, 14]
    },
    36, 2864459, seasonIntervals),
    new Country('Slovenia',
    {
    summer: [16, 27],
    fall: [-2, 10],
    winter: [-12, 0],
    spring: [0, 13]
    },
    48, 2081900, seasonIntervals),
    new Country('Latvia',
    {
    summer: [16, 25],
    fall: [-3, 10],
    winter: [-12, 0],
    spring: [0, 11]
    },
    40, 1911108, seasonIntervals),
    new Country('Estonia',
    {
    summer: [17, 27],
    fall: [-2, 10],
    winter: [-16, 0],
    spring: [0, 15]
    },
    48, 1303798, seasonIntervals),
    new Country('Malta',
    {
    summer: [16, 30],
    fall: [-2, 15],
    winter: [-8, 2],
    spring: [0, 16]
    },
    40, 433245, seasonIntervals),
    new Country('Iceland',
    {
    summer: [10, 20],
    fall: [-5, 8],
    winter: [-22, -2],
    spring: [0, 10]
    },
    40, 340566, seasonIntervals)
  ];
