/**!
* Bancroft_proto v1.2.0 (https://github.com/jonwash96/bancroft_proto)
* Description: Appends useful methods to the built-in the String & Number prototypes.
* Copyright (c) 2026 Jonathan Washington
*/



String.prototype._ellipses = ellipses;
/** 
 * Limits a string to <maxChars>, replacing the last char with "..."
 * @param: if maxChars == <0|falsy>, don't limit (Useful for dynamic & iterative use)
 */
function ellipses(maxChars=80) {
	return maxChars && this.length > maxChars 
      ? this.substring(0,maxChars)+"..." 
      : this;
}

String.prototype._toTitleCase = toTitleCase;
/** 
 * Capitalize the first letter of each word in a string.
 * - Prepend words with '*' to ignore.
 * @param [r]eplace; [w]ith:
 * - Pass any char as arg1 to be globally replaced with arg2 
 * 		- i.e. "alter-this-string" -> ('-', ', ') => "Alter, This, String"
 */
function toTitleCase(r='', w) {
    const words = this.replaceAll(r, r !== '' ? w ? w : ' ' : '').split(' ');
    return words.map(word => {
        if (word[0].startsWith('*')) return word.replace('*', '')
        else return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ').trim();
}


String.prototype._pluralize = pluralize;
/**
 * [dumb] Add an "s" to the end of a wod if it doesn't have one.
 * Add an appostrophee at the end if there's already an "s".
 * Matches case.
 */
function pluralize() {
    if (this.match(/.+s$/i)) return this + "'"
    else return this.match(/[a-z]/) 
        ? this + "s" 
        : this + "S";
}

String.prototype._dePluralize = dePluralize;
/**
 * [dumb] Remove the "s" from the end of a word.
 */
function dePluralize() {
	return this.replace(/(?<=.+)s$/i, '')
}

String.prototype._togglePlural = togglePlural;
/** 
 * [smart] Toggle the suffix at the end of a word, matching case.
 * Default suffix is "s".
 * @returns { string } Copy of the initial string.
 * @param { number } num :optional: Pass a number to pluralize based on value, otherwise add appostrophee
 * @param { string } singular :optional: Replaces the role of 's'; Matches param & swaps the match on toggle.
 * - Example: 'Box'._togglePlural(2, 'es') ➜ 'Boxes'._togglePlural(1, 'es')  ➜ 'Box'
 * @param { string } singlular :optional: If plural is set, swaps one match for the next, else adds plural if not exist. 
 * - Example: 'Cranberry'._togglePlural(21, 'ies', 'y') ➜ 'Cranberries'
 * - Example: 'Geese'._togglePlural(1, 'eese', 'oose') ➜ 'Goose'
 * - Example: 'Bus'._togglePlural(4321, 'es') ➜ 'Buses'._togglePlural(32, 'es') ➜ 'Buses'
 * - Example: 'Quiz'._togglePlural(null, 'zes') ➜ 'Quizzes'._togglePlural(null, 'zes') ➜ 'Quiz'
 */
function togglePlural(num, plural=null, singular=null) {
    const isPlural    = plural ? RegExp(`(?<=.+)${plural}$`, 'i').test(this) : this.at(-1) === 's';
    const isSingular  = singular ? RegExp(`(?<=.+)${singular}$`, 'i').test(this) : !isPlural;
    const endsWith_S  = /(?<=.+)s$/i.test(this);
    const matchCase_suffix = (which) => /[a-z]/.test(this.at(-1)) ? which.toLowerCase() : which.toUpperCase();
    const matchCase_S = () => this + (/[a-z]/.test(this) ? "s" : "S");
    const regex  = (which) => RegExp(`(?<=.+)${which}$`);

    if (singular && !plural) {
        console.warn("@togglePlural: Either only plural (arg 2), both plural & singular (args 2 & 3), or neighther must be set. Got:", {plural, singular});
        return this
    }

	if (plural) {
		if (isPlural) return num 
			? num === 1 
				? this.replace(regex(plural), matchCase_suffix(singular ?? '')) 
				: String(this)
			: this.replace(regex(plural), matchCase_suffix(singular ?? ''));
		else if (isSingular) return num && num === 1
			? String(this)
			: singular 
				? this.replace(regex(singular), matchCase_suffix(plural ?? 's'))
				: this + plural;
	}
    else return num /* if neither are set or string doesn't match: */
        ? endsWith_S 
			? num === 1 ? this.slice(0, this.length -1) : String(this)
			: num === 1 ? String(this) : matchCase_S()
        : endsWith_S ? this.slice(0, this.length -1) : matchCase_S();
}


String.prototype._camelToTitle = camelToTitle;
/**
 * Convert camelCase to Title Case.
 */
function camelToTitle() {
    let str = this.split('');
    for (let i=(str.length-2); i>=0; i--) {
        if (str[i+1].match(/[A-Z]/)) {
            str.splice(i, 1, [str[i]," "]);
            i--;
        };
    };
    const strWithSpaces = str.flat().join('');
    str = strWithSpaces.split(' ');
    str[0] = str[0]._toTitleCase();
    return str.join(' ');
}


String.prototype._normalizeCSV = normalizeCSV;
/**
 * Add a psace after the comma in a CSV string.
 */
function normalizeCSV() {
    if (this.match(/,\S/g)) {
        return this.replaceAll(/,/g, ', ')
    } else return this
}


String.prototype._epochTo = epochTo;
Number.prototype._epochTo = epochTo;
/** 
 * Change a Unix epoch timestring or number to another datetime format.
 * @param: return format.
 * case "recent": Intelligently interprets how long time the date was
 * 		@returns: A string expressing how long ago the time was.
 */
function epochTo(format) {
    if (!new Date(this)) return;
    try {
        const date = new Date(this);
        const diff = Date.now() - Number(this);
        const oneDay = 86400000;
        const oneHour = 3600000;
        const sixHours = 21600000;
        switch (format) {
            case 'recent': {
                if (diff < oneHour) {
                    return Math.floor(diff / (sixHours / 6 / 60))+" minutes ago";
                } else if (diff < sixHours) {
                    return Math.floor(diff / (sixHours / 6))+" hours ago";
                } else if (diff <  oneDay*2) {
                    return "Yesterday at "+date.toLocaleTimeString().replace(/:\d\d?\s/, ' ');
                } else if (diff < oneDay * 6) {
                    return String(date).split(' ')[0]+" at"+date.toLocaleTimeString().replace(/:\d\d?\s/, ' ');
                } else {
                    return date.toLocaleDateString();
                }
            }
        }
    } catch (err) {
        console.warn("epochTo encountered a non-fatal error.", err);
        return this;
    }
}

String.prototype._toOrdered = toOrdered;
Number.prototype._toOrdered = toOrdered;
/**
 * Appends the 2 letter string indicatng a number's order in a list.
 */
function toOrdered(which=0) {
    if (!/\d/g.test(this)) return;
    let num;
    if (typeof which === 'number') num = String(this).match(/\d+/g)[which]
    if (typeof which === 'string') num = String(this).match(/\d+/g).join('');

    if (num == 11) return '11th'
    if (/\d*1$/g.test(num)) return num+'st'
    if (num == 2) return '2nd'
    if (num == 3) return '3rd'
    if (num == 3) return '3rd'
    return num+'th'
}


String.prototype._cfk = cfk;
Number.prototype._cfk = cfk;
/**
 * Convert bewen Celcius, Fareinheight, Kelvin.
 * @param 1: convert from <c|f|k>
 * @param 2: convert to <c|f|k>
 * @param 3: (optional) Return string of num, degree symbol and units
 * @param 4: (optional) Limit decimal numbers to X places.fixed
 * @returns: String with units, Number without
 */
function cfk(from, onto, units=true, fixed=2) {
	let result, c;
	const num = parseFloat(this);
	
	switch (from.toLowerCase()) {
		case 'c': c = num; 					break;
		case 'f': c = (num - 32) * (5 / 9); 	break;
		case 'k': c = num - 273.15; 			break;
	}
	
	switch (onto.toLowerCase()) {
		case 'c': result = c; 					break;
		case 'f': result = (c * 9 / 5) + 32; 	break;
		case 'k': result = c + 273.15; 			break;
	}

	return units 
        ? result.toFixed(fixed)+'°'+onto
		: result.toFixed(fixed);
}


String.prototype._toRoman = toRoman;
Number.prototype._toRoman = toRoman;
/**
 * Convert any number (0 – 3999) to Roman Numerals.
 * @param {boolean} toggle uppercase
 */
function toRoman(uppercase=true) {
    if (!/\d/g.test(this)) return;
    let num = this;
    if (num <= 0 || num > 3999) return this;

    const map = [
        ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
        ['C', 100],  ['XC', 90],  ['L', 50],  ['XL', 40],
        ['X', 10],   ['IX', 9],   ['V', 5],   ['IV', 4],
        ['I', 1]
    ];

    let result = '';

    for (const [letter, value] of map) {
        while (num >= value) {
            result += letter;
            num -= value;
        }
    }

    return uppercase ? result : result.toLowerCase();
}