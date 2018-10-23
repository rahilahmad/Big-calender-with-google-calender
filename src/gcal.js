import request from 'superagent'

const CALENDAR_ID = 'nu.edu.pk_rjvo0a8hogvtgcpavvol7u1sno@group.calendar.google.com'
const API_KEY = 'AIzaSyBT4tlNuisZ1CO1SEAxkxsy2mBs6WW0bM8'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
      return  callback(events)
      }
    })
}