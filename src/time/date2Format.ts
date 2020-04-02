export { date2Format as date2FormatDate };

function date2Format(date: Date, format = "YYYY-MM-DD hh:mm:ss"): string {
    format = format.replace("YYYY", "" + date.getFullYear())
        .replace("MM", ("0" + (date.getMonth() + 1)).slice(-2))
        .replace("DD", ("0" + date.getDate()).slice(-2))
        .replace("hh", ("0" + date.getHours()).slice(-2))
        .replace("mm", ("0" + date.getMinutes()).slice(-2))
        .replace("ss", ("0" + date.getSeconds()).slice(-2));

    return format;
}
