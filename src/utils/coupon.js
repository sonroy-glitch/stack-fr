export default function couponGenerator() {
    var i = 6;
    var str = "";
    while (i > 0) {
        var n = Math.random();
        if (0 < n && n <= (1 / 8)) {
            str += "A";
        } else if ((1 / 8) < n && n <= (2 / 8)) {
            str += "B";
        } else if ((2 / 8) < n && n <= (3 / 8)) {
            str += "C";
        } else if ((3 / 8) < n && n <= (4 / 8)) {
            str += "D";
        } else if ((4 / 8) < n && n <= (5 / 8)) {
            str += "E";
        } else if ((5 / 8) < n && n <= (6 / 8)) {
            str += "1";
        } else if ((6 / 8) < n && n <= 1) {
            str += "2";
        }
        i--;
    }
    return str;
}