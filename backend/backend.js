const database = require('./database');
const { PriorityQueue } = require('./priorityQueue');


const minHalls = intervals => {
    const result = [];
    let count = 0;
    let hallNumber = -1;

    const lectures = intervals.map(function (obj) {
        return [
            obj.starttime,
            obj.endtime,
            obj.lectureid,
            hallNumber
        ];
    });
    // console.log("unsorted Lectures", lectures);  // checking purpose 
    if (!lectures || lectures.length === 0) {
        return [];
    }

    //sort the intervals by start time 
    lectures.sort((a, b) => a[0].localeCompare(b[0]));
    console.log("sorted lectures", lectures);

    //use a min heap to track the min end time of merged intervals
    const heap = new PriorityQueue({
        comparator: (a, b) => a[1].replace(/:/g, '') - b[1].replace(/:/g, ''),
    });

    //start with the first lecture, put it to a hall
    heap.offer(lectures[0]);
    lectures[0][3] = count;
    result.push([{
        lectureId: parseInt(lectures[0][2]),
        startTime: lectures[0][0].replace(/:/g, "").slice(0, -2),
        endTime: lectures[0][1].replace(/:/g, "").slice(0, -2)
    }]);
    count++;

    //2nd lecture onwards 
    for (let i = 1; i < lectures.length; i++) {

        const current = lectures[i];
        console.log("current lecture: ", current);

        //get halls that finish the earliest 
        const lecture = heap.poll();
        console.log("earliest ending lecture:", lecture);

        if (current[0] >= lecture[1]) {
            //if the current lecture start right after, no need for a new hall, merge the interval
            console.log("Adding to hall: ", lecture[3]);

            const hallNumber = lecture[3]
            result[hallNumber].push({
                lectureId: parseInt(current[2]),
                startTime: current[0].replace(/:/g, "").slice(0, -2),
                endTime: current[1].replace(/:/g, "").slice(0, -2)
            });
            lecture[1] = current[1];
        } else {
            //no hall found,lecture needs a new hall 
            current[3] = count++;
            result.push([{
                lectureId: parseInt(current[2]),
                startTime: current[0].replace(/:/g, "").slice(0, -2),
                endTime: current[1].replace(/:/g, "").slice(0, -2)
            }]);
            console.log("Lecture needs a new hall");
            console.log("current", current[3]);
            heap.offer(current);
        }
        //put the hall back
        heap.offer(lecture);
    }
    return result;
};


//overlapping interval (advance result)
const merge = (technicianTimings, lectureTimings) => {
    const result = []; //{}
    const events = []
    const technicians = technicianTimings.forEach(function (object) {

        events.push([
            2,
            object.technicianid,
            object.starttime,])
        events.push([
            -2,
            object.technicianid,
            object.endtime,])
    });

    const lectures = lectureTimings.forEach(function (obj) {
        events.push([
            1,
            obj.lectureid,
            obj.starttime,])
        events.push([
            -1,
            obj.lectureid,
            obj.endtime,])
    });
    console.log("unsorted time ", events);

    //sort time of the event 
    events.sort((a, b) => a[2].localeCompare(b[2]));
    // events.sort((a, b) => a[2] > b[2] ? 1 : -1);  //sort the first element as well 
    console.log("sorted time", events);

    let currentLecture = 0;
    let currentTechnician = 0;

    if (events != 0) {
        const current = events[0][2];
        console.log(current);

        //find the number of surplus/lack of tecnichians 
        for (let i = 0; i < events.length - 1; i++) {
            let start = events[0][2];
            const current = events[i][2];

            if (start != current && currentLecture > 0) {
                // console.log("starttime", current)
                // console.log("surplus", currentTechnician - currentLecture)
            }
            if (events[i][0] == -1) {
                currentLecture += -1;
            } else if (events[i][0] == 1) {
                currentLecture += 1;
            } else if (events[i][0] == -2) {
                currentTechnician += -1;
            } else {
                currentTechnician += 1;
            }
            if (current == events[i + 1][2]) {
                continue;
            }
            console.log("surplus: ", currentTechnician - currentLecture);
            console.log("starttime: ", current);
            console.log("endtime: ", events[i + 1][2]);

            result.push({
                surplus: currentTechnician - currentLecture,
                startTime: current.replace(/:/g, "").slice(0, -2),
                endTime: events[i + 1][2].replace(/:/g, "").slice(0, -2)
            });
        }
        start = current;
    }


    return result;
};



module.exports = {
    minHalls,
    merge
};

