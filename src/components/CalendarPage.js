import React, {useState} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPage() {

const [event, setEvent] = useState([]);

const localizer = momentLocalizer(moment);

  React.useEffect(() => {
      getEvents()
  }, [])

/*Seuraavassa metodissa on saatu suuri apu Samuli Peltosen ratkaisusta*/
const getEvents = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then((response) => response.json())
    .then((data) => {
        let eventArray = []
        for (let i = 0; i < data.length; i++) {
            eventArray.push({
                title: data[i].activity,
                allday: "false",
                start: new Date(data[i].date),
                end: moment(data[i].date).add(data[i].duration, "minutes").toDate()
            })
        setEvent(eventArray);
        }
    })
    .catch((err) => console.error(err));
};

    return(
        <div style={{height:"700px"}}>
            <Calendar
                localizer={localizer}
                events={event}
                step={60}
                defaultView={"week"}
            ></Calendar>
        </div>
    )
}
export default CalendarPage;