

export function formatDate(date){
    return date.toLocaleString("ua",{
        month: "long",
        year: "numeric"
    })
}