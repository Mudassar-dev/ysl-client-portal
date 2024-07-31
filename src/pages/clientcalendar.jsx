import { Helmet } from 'react-helmet-async';

import { CalendarViewDropdown } from 'src/sections/clientCalendar/view';

// ----------------------------------------------------------------------

export default function ClientCalendarPage() {
  return (
    <>
      <Helmet>
        <title> Client Calendar | Hiring Portal </title>
      </Helmet>

      <CalendarViewDropdown />
    </>
  );
}
