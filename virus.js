class Virus {
    constructor (health, chance, minTemp, maxTemp, country) {
    this.health = health; // количество здоровья (если достигнет 0, то вирус умер)
    this.chance = chance; // шанс заражения человека в %
    this.minTemp = minTemp; // если ниже - умер
    this.maxTemp = maxTemp; // если выше - умер
    this.country = country; // в какой стране находится
    this.alive = true; // вирус жив или нет
    this.gens = ['health', 'chance', 'minTemp', 'maxTemp'];
}
    calcChance() {
        // рассчитываем коэффициент удачности заражения
        this.chance *= this.country.chance/100;
    };
    mutation() {
        let gen = rnd(0, this.gens.length - 1);
        gen = this.gens[gen]; // name of property

        let bin = this[gen].toString(2); // в двоичной системе число -> свойство вируса
        bin = invert(bin, rnd(0, bin.length)); // мутировавшее число

        this[gen] = parseInt(bin, 2);

        function invert(bin, i) {
            var tmp = bin[i] === '0' ? '1' : '0';
            return bin.substr(0, i) + tmp + bin.substr(i + 1);
        }
    };
    dead() {
        this.alive = false;
    };
    nextDay() {
        if(!this.alive) return false;
        this.health--;
        this.mutation();
        if(this.health < 0) this.dead();
    }
};
