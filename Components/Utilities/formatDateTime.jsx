export default function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's zero-indexed
    const day = date.getDate().toString().padStart(2, '0');

    // Extracting time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    // Formatting the date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    return {
        formattedDate,
        formattedTime
    };
}
