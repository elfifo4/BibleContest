function addGershaim(otiot) {
    let len = otiot.length;
    if (len === 0)
        otiot = "";
    else if (len === 1)
        otiot += "'";
    else
        otiot = otiot.substring(0, len - 1) + "\"" + otiot.charAt(len - 1);
    return otiot;
}

//    gematria, gimatria
// convert number to hebrew letters
function getOtiot(num) {
    let str = meot(num) + asarot(num) + ahadot(num);

    if (num % 100 === 15) str = meot(num) + "טו";
    else if (num % 100 === 16) str = meot(num) + "טז";

    return str;
}

function ahadot(num) {
    num = num % 10;
    return ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'][num];
}

function asarot(num) {
    num = Math.floor((num % 100) / 10);
    return ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'][num];
}

function meot(num) {
    num = Math.floor(num / 100);
    return ['', 'ק', 'ר', 'ש', 'ת'][num];
}


// export
function gematriaWord(word) {
    return word.split("").reduce((total, char) => total + gematriaOt(char), 0);
}

function gematriaOt(ot) {
    // noinspection NonAsciiCharacters
    let letters = {
        'א': 1,
        'ב': 2,
        'ג': 3,
        'ד': 4,
        'ה': 5,
        'ו': 6,
        'ז': 7,
        'ח': 8,
        'ט': 9,
        'י': 10,
        'כ': 20,
        'ך': 20,
        'ל': 30,
        'מ': 40,
        'ם': 40,
        'נ': 50,
        'ן': 50,
        'ס': 60,
        'ע': 70,
        'פ': 80,
        'ף': 80,
        'צ': 90,
        'ץ': 90,
        'ק': 100,
        'ר': 200,
        'ש': 300,
        'ת': 400,
    };
    return letters.hasOwnProperty(ot) ? letters[ot] : 0;
}


// put a question mark after each Vav and Yud letters to be ignored if need for missing spelling
//https://stackoverflow.com/questions/23458872/javascript-regex-word-boundary-b-issue
function makeVavAndYudOptional(string) {
    return string.replace(/\B([וי])\B/g, "$1?");
}


function getRandom(n) { //get random integer 1..n
    return Math.floor(Math.random() * n) + 1;
}

let colonSplitter = '׃';

function removeNikud(str) {
    let nikudChars = '[' + "ְֱֲֳִֵֶַָֹֻּׁׂ" + ']';
    str = str.replace(new RegExp(nikudChars, 'g'), "");
    return str;
}

function removeTeamim(str) {
    let teamimChars = '[' + "ֽ֪֑֧֖֪֥֭֚֮֨֜֝֕֔ׄ֒֫֬֡׀֣֤֛֦ׅ֘֙֟֗֓֞֠֩׆" + ']';
    str = str.replace(new RegExp(teamimChars, 'g'), "");
    return str;
}

function removeMakaf(str) {
    let makaf = '־';
    str = str.replace(new RegExp(makaf, 'g'), " ");
    return str;
}

function makeContinuousUnderlined(text) {
    return text.replace(/(_+)/, "<span class='blank'>$1</span>");
}

const makaf = '־';
const ktivExpression = "[א-ת]" + "{2,}";
const leftBracket = "\\(", rightBracket = "\\)"; //as characters
const noBrackets = "[^()]+";
const qriExpression = // for capturing group
    leftBracket + '(' + noBrackets + ')' + rightBracket;

function replaceKtivWithQri(str) {

    // nun menuzeret
    str = str.replace(new RegExp('׆' + "\\s?", 'g'), "");

    //negative look-behind: matches " word word (qri)" that is not preceded by a colonSplitter
    str = str.replace(new RegExp("(?<![" + colonSplitter + '}])' + "\\s" + ktivExpression
        + "\\s" + ktivExpression + makaf + '?' + "\\s" + qriExpression, 'g'), " " + "$1");

    str = str.replace(new RegExp(makaf + ktivExpression + "\\s" + qriExpression, 'g'),
        makaf + "$1");

    str = str.replace(new RegExp(ktivExpression + makaf + '?' + "\\s" + qriExpression, 'g'),
        "$1");

    //qri and not ktiv
    str = str.replace(new RegExp(qriExpression, 'g'), "$1");

    str = str.replace(new RegExp(makaf + " ", 'g'), makaf);

    str = str.replace(/ +/g, ' ');
    return str;
}

const NO_BREAK_SPACE = "\u00A0";
const mysteryCharZWJ = String.fromCharCode(8205);

function removeWhitespacesAndParshiot(str) {
    str = str.replace(new RegExp("\\{.+?\\}", 'g'), "");
    str = str.replace(new RegExp("([\\r\\n])", 'g'), " ");
    str = str.replace(new RegExp(mysteryCharZWJ, 'g'), "");
    str = str.replace(new RegExp(NO_BREAK_SPACE, 'g'), " ");
    str = str.replace(new RegExp(" +", 'g'), " ");
    return str;
}

function textWrappedByAsterisksToBold(text) {
    return text.replace(/\*(.*)\*/g, "<b>$1</b>");
}

let hebrewLettersNoSofiyot = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'
];

let hebrewLettersSofiyot = ['ך', 'ם', 'ן', 'פ', 'ץ'];

let hebrewLettersWithSofiyot = hebrewLettersNoSofiyot.concat(hebrewLettersSofiyot);

let allHebrewLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל', 'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'
];

let arrayHebrewLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', ['כ', 'ך'], 'ל', ['מ', 'ם'], ['נ', 'ן'], 'ס', 'ע', ['פ', 'ף'], ['צ', 'ץ'], 'ק', 'ר', 'ש', 'ת'
];
