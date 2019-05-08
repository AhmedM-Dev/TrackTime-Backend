function get_time_diff(times) {
    
    //Testing time validity

    let workedHours = new Date((new Date("2014-01-01 " + times[3]) - new Date("2014-01-01 " + times[0])) -
    (new Date("2014-01-01 " + times[2]) - new Date("2014-01-01 " + times[1])));

    return workedHours;
}

export default get_time_diff;
