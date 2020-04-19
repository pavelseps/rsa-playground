export default class Helpers{
    static expmod( base :number, exp :number, mod :number ) : number{
        if (exp === 0) return 1;
        if (exp % 2 == 0){
            return Math.pow( Helpers.expmod( base, (exp / 2), mod), 2) % mod;
        }
        else {
            return (base * Helpers.expmod( base, (exp - 1), mod)) % mod;
        }
    }
}