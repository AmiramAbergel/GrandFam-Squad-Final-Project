import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
export default function DndCalendar() {
    const [state, setState] = useState({ events: events });

    function moveEvent({ event, start, end }) {
        const { events } = state;
        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };
        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);
        setState({
            events: nextEvents,
        });
    }

    function resizeEvent(resizeType, { event, start, end }) {
        const { events } = state;
        const nextEvents = events.map((existingEvent) => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });
        setState({
            events: nextEvents,
        });
    }

    return (
        <DragAndDropCalendar
            className='calendar'
            selectable
            localizer={localizer}
            events={state.events}
            onEventDrop={moveEvent}
            resizable
            onEventResize={resizeEvent}
            defaultView='month'
            defaultDate={new Date(2015, 3, 12)}
            style={{ height: '80vh' }}
        />
    );
}
