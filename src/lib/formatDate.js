export function formatDate(dateString) {
  let formattedString = '';

  if (dateString.indexOf(' ') > -1) {
    const [date, time] = dateString.split(' ');
    formattedString = `${date}T${time}-0400`;
  } else if (dateString.indexOf('T') === -1) {
    formattedString = `${dateString}T00:00:00-0400`;
  } else {
    formattedString = dateString;
  }

  return new Date(formattedString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
