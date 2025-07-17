export const FormatDate =(date) => {
    // ensure the date is valid date project 
    const _date =new Date(date);
    // check if the date is valid

    if(isNaN(_date)){
        console.log("invalid date ");
        return 'Invalid date ';
    }

    // formate the date usinf Int1.date Time Formate 
    const formattedDate = new Intl.DateTimeFormat('en-US' ,{
        year: 'numeric',
        month:'long',
        day:'numeric',
    }).format(_date)
    return formattedDate;
};