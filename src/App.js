import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { getEvents } from './gcal';
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = Calendar.momentLocalizer(moment);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    getEvents((events) => {
      this.setState({ events })
    })
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }
  render() {
    return (
      <Calendar
        selectable
        localizer={localizer}
        culture='en-GB'
        style={{ height: '50vh' }}
        defaultView={Calendar.Views.WEEK}
        events={this.state.events}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={this.handleSelect}
      />
    )
  }
}

export default App;