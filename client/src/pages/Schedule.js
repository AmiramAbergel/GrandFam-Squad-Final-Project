import React, { useState } from 'react';
import events from './events';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import styled from '@emotion/styled';
const StyledCalender = styled.div`
    /* Center the map on the page */
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    Set dimensions of the map */

    width: calc(100% - 100px);
    margin-left: 20px;
    height: 95vh;
    animation: fadeIn 3s ease-in-out;
    @media (max-width: 768px) {
        width: calc(100% - 50px);
        height: 75vh;
    }
`;

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
        <StyledCalender>
            <DragAndDropCalendar
                draggableAccessor='isDraggable'
                className='calendar'
                selectable
                localizer={localizer}
                events={state.events}
                onEventDrop={moveEvent}
                resizable
                onEventResize={resizeEvent}
                defaultView='month'
                defaultDate={new Date(2023, 0, 25)}
                style={{ height: '80vh' }}
                popup={true}
                eventPropGetter={(event) => {
                    const backgroundColor = event.assignedTo ? 'red' : 'blue';
                    return { style: { backgroundColor } };
                }}
            />
        </StyledCalender>
    );
}
