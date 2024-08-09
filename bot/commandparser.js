function parseCommand(string) {
    console.time('Execution time');

    string += " ";
    string = string.replace("```", " `");

    var chars = string.split('');

    var inQuote = false;
    var quoteType = "";
    var arguments = [];
    var flags = {};

    var isFlag = false;
    var flagName = "";
    var currentWrite = "";

    var readingFlagName = false;

    var escaped = false;
    var lastChar = "";

    for (var char of chars) {
        if (escaped == false && char == "\\") {
            escaped = true;
            lastChar = char;
            continue;
        }
        if(escaped) {
            escaped = false;
            currentWrite += char;
            lastChar = char;
            continue;
        }

        if (char == '"' || char == "'" || char == "`" || char == "¶") {
            if (char == quoteType || inQuote == false) {
                inQuote = !inQuote;
                quoteType = char;
                lastChar = char;
                continue;
            }
        }

        if (inQuote || escaped) {
            currentWrite += char;
            escaped = false;
            lastChar = char;
            continue;
        }

        if (char == " " && !inQuote) {
            if (readingFlagName) {
                readingFlagName = false;
                lastChar = char;
                continue;
            }
            if (isFlag) {
                flags[flagName] = currentWrite;
                currentWrite = "";
                isFlag = false;
                lastChar = char;
                continue;
            }
            arguments.push(currentWrite);
            currentWrite = "";
        }

        if (char == "-" && !inQuote && lastChar == " ") {
            flagName = "";
            readingFlagName = true;
            isFlag = true;
            lastChar = char;
            continue;
        }

        if (!readingFlagName) {
            if (currentWrite == "" && char == " ") {
                lastChar = char;
                continue;
            }
            currentWrite += char;
        }

        if (readingFlagName) {
            flagName += char;
        }
        lastChar = char;
    }

    return [arguments, flags]
}

module.exports = parseCommand;