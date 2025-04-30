export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((seconds % 3600) / 60); // 1 minute = 60 seconds
  const remainingSeconds = Math.round(seconds % 60); // Remaining seconds

  // Create an array to hold the time components
  const timeArray = [];

  if (hours > 0) {
    timeArray.push(`${hours}H`);
  }

  if (minutes > 0) {
    timeArray.push(`${minutes}M`);
  }

  // Always show seconds, even if they're zero
  timeArray.push(`${remainingSeconds}S`);

  // Join the components with ":"
  return timeArray.join(":");
  };

  