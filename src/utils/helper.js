import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const getUserRole = () => {
    const roleValue = localStorage.getItem('role');
    if (roleValue) {
      return atob(roleValue);
    }
    return roleValue;
  };

export function isFormatDate(isoDateString) {
    const date = new Date(isoDateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  export function isFormatTime(isoDateString) {
    const date = new Date(isoDateString);
  
   // Get the time
   let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');

   // Determine AM or PM
   const ampm = hours >= 12 ? 'PM' : 'AM';

   // Convert to 12-hour format
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   const formattedHours = String(hours).padStart(2, '0');
  
   // Return time
   return `${formattedHours}:${minutes} ${ampm}`;
  }

  export function formatYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }


// Function to convert "DD-MM-YYYY" to "YYYY-MM-DD"
// Function to convert dates to "YYYY-MM-DD" format
export function convertDateString(dateInput) {
  // Convert the input to a string and trim any extra spaces
  const dateString = dateInput.toString().trim();

  // Check if the input is a number (Excel serial date)
  if (!isNaN(Number(dateString))) {
    const serialDate = Number(dateString);
    const excelStartDate = new Date(1900, 0, 1); // January 1, 1900
    const date = new Date(excelStartDate.getTime() + (serialDate - 2) * 24 * 60 * 60 * 1000);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      throw new Error('Invalid date from serial number');
    }
  } else {
    // Handle cases for various string formats
    const formats = [
      { pattern: /^\d{2}-\d{2}-\d{4}$/, separator: '-', order: ['day', 'month', 'year'] },
      { pattern: /^\d{2}\/\d{2}\/\d{4}$/, separator: '/', order: ['day', 'month', 'year'] },
      { pattern: /^\d{4}-\d{2}-\d{2}$/, separator: '-', order: ['year', 'month', 'day'] },
      { pattern: /^\d{4}\/\d{2}\/\d{2}$/, separator: '/', order: ['year', 'month', 'day'] },
    ];

    for (const { pattern, separator, order } of formats) {
      if (pattern.test(dateString)) {
        const [first, second, third] = dateString.split(separator).map(Number);
        const [day, month, year] = order[0] === 'day' ? [first, second, third] : [third, second, first];

        // Validate and construct the date
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          const formattedDate = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
          ].join('-');
          return formattedDate;
        } else {
          throw new Error('Invalid date values');
        }
      }
    }
    throw new Error('Date string is in an incorrect format');
  }
}









  const formatByDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  function timeAgo(givenDateString) {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const duration = currentDate.getTime() - givenDate.getTime();
  
    const timeDiffInSeconds = Math.max(Math.floor(duration / 1000), 1); 
    if (timeDiffInSeconds < 60) {
      return `${timeDiffInSeconds} sec${timeDiffInSeconds > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 604800) {
      const days = Math.floor(timeDiffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 2592000) {
      const weeks = Math.floor(timeDiffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 31536000) {
      const months = Math.floor(timeDiffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDiffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  export const getErrorMessage = (error) => {
    if (error) {
        // Check if error is a FieldError and has a message
        if ('message' in error && typeof error.message === 'string') {
            return error.message;
        }
    }
    return ''; // Return empty string if error is undefined or does not have a message
};

export const getErrorMessageArray = (error) => {
  if (Array.isArray(error)) {
    return error.map(e => e.message).join(', ');
  }
  return error?.message || 'Unknown error';
};


const formatPhase = (currentPhase) => {
  // Check if currentPhase is a valid string
  if (typeof currentPhase !== 'string' || !currentPhase.startsWith('phase_')) {
    return "Unknown Phase"; // Return a fallback value if it's not a valid phase string
  }

  const phaseNumber = parseInt(currentPhase.replace("phase_", ""), 10); // Extract the number dynamically
  if (isNaN(phaseNumber)) return "Unknown Phase"; // Fallback for invalid phase

  // Determine the ordinal suffix dynamically
  const suffix =
    phaseNumber % 10 === 1 && phaseNumber % 100 !== 11
      ? "st"
      : phaseNumber % 10 === 2 && phaseNumber % 100 !== 12
      ? "nd"
      : phaseNumber % 10 === 3 && phaseNumber % 100 !== 13
      ? "rd"
      : "th";

  return `${phaseNumber}${suffix} Phase`;
};




  export {
  getUserRole,
  formatByDate,
  timeAgo,
  formatPhase
  }

